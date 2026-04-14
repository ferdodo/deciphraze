import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import { generateParagraph } from "../utils/generateParagraph";
import { characterEquals } from "../utils/characterEquals";
import type { GameContext } from "../contexts/GameContext";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const selectLetter = (
	character: string,
	context: GameContext,
): void => {
	const {
		allGamesRepository,
		timeService,
		forcedDayRepository,
		gameHistoryRepository,
		associationHistoryRepository,
	} = context;
	
	const currentDay = getCurrentDay(timeService, forcedDayRepository);
	const paragraphOfTheDay = generateParagraph(currentDay);
	const gameHistory = gameHistoryRepository.getHistory();
	const allGames = allGamesRepository.get();
	const gameDay = getCurrentGameDay(allGames, currentDay);
	const gameData = allGames.gameByDay[gameDay] ?? {
		letterSelection: null,
		symbolSelection: null,
		playerCipher: {},
	};
	const playerCipher = gameData.playerCipher;

	if (isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay)) {
		return;
	}
	
	if (!isAlphabetic(character)) {
		return;
	}

	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const currentLetter = gameData.letterSelection;
	const currentSymbol = gameData.symbolSelection;

	if (currentLetter === normalizedCharacter) {
		const updatedPlayerCipher = { ...playerCipher };
		delete updatedPlayerCipher[normalizedCharacter];
		allGamesRepository.upsertByDay(gameDay, {
			...gameData,
			playerCipher: updatedPlayerCipher,
			letterSelection: null,
		});
		return;
	}

	if (currentSymbol !== null) {
		const isCorrect = characterEquals(normalizedCharacter, currentSymbol);
		// Supprimer les associations précédentes avec le même symbole
		const updatedPlayerCipher = { ...playerCipher };
		const keyToRemove = Object.keys(updatedPlayerCipher).find(key => updatedPlayerCipher[key] === currentSymbol);
		if (keyToRemove) {
			delete updatedPlayerCipher[keyToRemove];
		}
		updatedPlayerCipher[normalizedCharacter] = currentSymbol;
		associationHistoryRepository.addAssociation(currentDay, normalizedCharacter, currentSymbol, isCorrect);
		allGamesRepository.upsertByDay(gameDay, {
			...gameData,
			playerCipher: updatedPlayerCipher,
			letterSelection: null,
			symbolSelection: null,
		});
		return;
	}

	allGamesRepository.upsertByDay(gameDay, {
		...gameData,
		letterSelection: normalizedCharacter,
	});
};

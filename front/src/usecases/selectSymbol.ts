import { normalizeWord } from "@deciphraze/core";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import { generateParagraph } from "../utils/generateParagraph";
import { characterEquals } from "../utils/characterEquals";
import type { GameContext } from "@deciphraze/core";
import { getCurrentDay } from "../utils/getCurrentDay";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const selectSymbol = (
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
	
	// Vérifier si la partie est gagnée avant toute action
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

	if (currentSymbol === normalizedCharacter) {
		const updatedPlayerCipher = { ...playerCipher };
		const keyToRemove = Object.keys(updatedPlayerCipher).find(key => updatedPlayerCipher[key] === normalizedCharacter);
		if (keyToRemove) {
			delete updatedPlayerCipher[keyToRemove];
		}
		allGamesRepository.upsertByDay(gameDay, {
			...gameData,
			playerCipher: updatedPlayerCipher,
			symbolSelection: null,
		});
		return;
	}

	if (currentLetter !== null) {
		const isCorrect = characterEquals(currentLetter, normalizedCharacter);
		// Supprimer les associations précédentes avec le même symbole
		const updatedPlayerCipher = { ...playerCipher };
		const keyToRemove = Object.keys(updatedPlayerCipher).find(key => updatedPlayerCipher[key] === normalizedCharacter);
		if (keyToRemove) {
			delete updatedPlayerCipher[keyToRemove];
		}
		updatedPlayerCipher[currentLetter] = normalizedCharacter;
		associationHistoryRepository.addAssociation(currentDay, currentLetter, normalizedCharacter, isCorrect);
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
		symbolSelection: normalizedCharacter,
	});
};

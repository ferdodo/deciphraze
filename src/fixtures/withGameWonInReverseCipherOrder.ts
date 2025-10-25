import type { GameContextType } from "../types/GameContextType";
import { withGameStarted } from "./withGameStarted";
import { selectLetter } from "../usecases/selectLetter";
import { selectSymbol } from "../usecases/selectSymbol";

export function withGameWonInReverseCipherOrder(): GameContextType {
	const context = withGameStarted();
	const paragraphOfTheDay = context.paragraphOfTheDayRepository.getParagraphOfTheDay();
	
	const uniqueLetters = [...paragraphOfTheDay]
		.filter(letter => letter.match(/[a-zA-Z]/))
		.filter((letter, index, array) => array.indexOf(letter) === index);
	
	const reversedLetters = [...uniqueLetters].reverse();
	
	reversedLetters.forEach((letter) => {
		selectLetter(letter, context);
		selectSymbol(letter, context);
	});
	
	return context;
}

import type { GameContext } from "../contexts/GameContext";
import { formatDate } from "../utils/formatDate";

export const decrementDay = (context: GameContext): void => {
	const currentDay = context.dayRepository.getDay();
	const date = new Date(currentDay);
	date.setDate(date.getDate() - 1);
	const newDay = formatDate(date);
	context.dayRepository.setDay(newDay);
};


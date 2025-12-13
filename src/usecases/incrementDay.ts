import type { GameContext } from "../contexts/GameContext";

const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	
	return `${year}-${month}-${day}`;
};

export const incrementDay = (context: GameContext): void => {
	const currentDay = context.dayRepository.getDay();
	const date = new Date(currentDay);
	date.setDate(date.getDate() + 1);
	const newDay = formatDate(date);
	context.dayRepository.setDay(newDay);
};


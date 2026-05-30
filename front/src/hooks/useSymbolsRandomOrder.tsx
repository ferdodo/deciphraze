import { useCurrentDay } from "./useCurrentDay";
import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import { isDev } from "../utils/isDev";

const ALPHABET: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const useSymbolsRandomOrder = (): string[] => {
	const currentDay = useCurrentDay();
	return isDev() ? ALPHABET : generateRandomAlphabet(`${currentDay}_not_cipher`);
};

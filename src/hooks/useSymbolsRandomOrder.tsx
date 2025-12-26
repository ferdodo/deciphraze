import { useMemo } from "react";
import { useDay } from "./useDay";
import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import { isDev } from "../utils/isDev";

const ALPHABET: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export const useSymbolsRandomOrder = (): string[] => {
	const currentDay = useDay();
	
	const symbolsOrder = useMemo(() => {
		return isDev() ? ALPHABET : generateRandomAlphabet(currentDay + "_not_cipher");
	}, [currentDay]);
	
	return symbolsOrder;
};


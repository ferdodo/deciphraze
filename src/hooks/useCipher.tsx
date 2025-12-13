import { useMemo } from "react";
import { useDay } from "./useDay";
import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import type { Cipher } from "../types/Cipher";

export const useCipher = (): Cipher => {
	const currentDay = useDay();
	
	const cipher = useMemo(() => {
		return generateRandomAlphabet(currentDay);
	}, [currentDay]);
	
	return cipher;
};

import { useMemo } from "react";
import { useCurrentDay } from "./useCurrentDay";
import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import type { Cipher } from "../types/Cipher";

export const useCipher = (): Cipher => {
	const currentDay = useCurrentDay();
	
	const cipher = useMemo(() => {
		return generateRandomAlphabet(currentDay);
	}, [currentDay]);
	
	return cipher;
};

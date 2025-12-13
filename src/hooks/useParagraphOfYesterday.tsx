import { useMemo } from "react";
import { useYesterday } from "./useYesterday";
import { generateParagraph } from "../utils/generateParagraph";

export const useParagraphOfYesterday = (): string => {
	const yesterday = useYesterday();
	
	const paragraph = useMemo(() => {
		return generateParagraph(yesterday);
	}, [yesterday]);

	return paragraph;
};


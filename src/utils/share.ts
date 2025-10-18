import { createShareMessage } from "./createShareMessage";

export const share = (matchCount: number): void => {
	const text = createShareMessage(matchCount);
	navigator.clipboard.writeText(text);
};

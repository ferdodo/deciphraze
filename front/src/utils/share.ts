import type { BrowserService } from "@deciphraze/core";
import { createShareMessage } from "./createShareMessage";

export const share = (matchCount: number, browserService: BrowserService): void => {
	const text = createShareMessage(matchCount);
	browserService.clipboardCopy(text);
};

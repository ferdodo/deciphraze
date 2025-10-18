import { ebook1 } from "./constants/ebook1";
import { randomNumberForYesterday } from "./utils/randomNumberForYesterday";

export const paragraphOfYesterday: string = getParagraphOfTheYesterday();

function getParagraphOfTheYesterday(): string {
	const lines = ebook1.split(/\r\n|\r|\n/);
	const lineCount = lines.length - 200;
	const paragraphStartLine = randomNumberForYesterday(200, lineCount);
	let paragraph = "";
	let cursor = 0;

	while (paragraph.length < 200) {
		paragraph += lines[paragraphStartLine + cursor];
		cursor++;
	}

	return paragraph;
}

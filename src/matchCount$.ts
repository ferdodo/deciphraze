import { Observable } from "rxjs";
import { playerCipher } from "./playerCipher";

const totalMatches = new Set();

export const matchCount$ = new Observable<number>(function (subscriber) {
	playerCipher.playerCipher$.subscribe(function (
		playerCipherMap: Map<string, string>,
	) {
		for (const [k, v] of playerCipherMap) {
			totalMatches.add(`${k}${v}`);
		}

		subscriber.next(totalMatches.size);
	});
});

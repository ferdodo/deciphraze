import { Observable } from "rxjs";
import { playerCipher$ } from "./playerCipher";

const totalMatches = new Set();

export const matchCount$ = new Observable<number>(function(subscriber) {
	playerCipher$.subscribe(function(playerCipher) {
		for (const [k, v] of playerCipher) {
			totalMatches.add(`${k}${v}`);
		}

		subscriber.next(totalMatches.size);
	});
});

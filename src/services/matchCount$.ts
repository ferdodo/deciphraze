import { Observable } from "rxjs";
import { createPlayerCipher } from "../utils/createPlayerCipher";

const playerCipher = createPlayerCipher();

const totalMatches = new Set();

export const matchCount$ = new Observable<number>((subscriber) => {
	playerCipher.playerCipher$.subscribe(
		(playerCipherMap: Map<string, string>) => {
			for (const [k, v] of playerCipherMap) {
				totalMatches.add(`${k}${v}`);
			}

			subscriber.next(totalMatches.size);
		},
	);
});

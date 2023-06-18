import { Observable } from "rxjs";
import { letterSelection$, selectLetter$, getLetterSelection } from "./letterSelection";
import { symbolSelection$, selectSymbol$, getSymbolSelection } from "./symbolSelection";

let playerCipher = new Map<string, string>();

export function getPlayerCipher() {
	return new Map(playerCipher);
}

export const playerCipher$ = new Observable<Map<string, string>>(function(subscriber) {
	let letterSelection = getLetterSelection();
	let symbolSelection = getSymbolSelection();

	letterSelection$.subscribe(function(letter) {
		letterSelection = letter;

		if (letterSelection !== null && symbolSelection !== null) {
			playerCipher = new Map(playerCipher)
				.set(letterSelection, symbolSelection);


			setTimeout(function() {
				selectLetter$.next(null);
				selectSymbol$.next(null);	
			}, 10);

			subscriber.next(playerCipher);
		}
	});

	symbolSelection$.subscribe(function(sym) {
		symbolSelection = sym;

		if (letterSelection !== null && symbolSelection !== null) {
			playerCipher = new Map(playerCipher)
				.set(letterSelection, symbolSelection);

			setTimeout(function() {
				selectLetter$.next(null);
				selectSymbol$.next(null);	
			}, 10);

			subscriber.next(playerCipher);
		}
	});
});

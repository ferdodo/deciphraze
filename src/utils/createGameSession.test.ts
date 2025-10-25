import { describe, it, expect } from "vitest";
import { createGameSession } from "./createGameSession";
import type { PlayerCipher } from "../types/PlayerCipher";

describe("createGameSession", () => {
	it("should create a game session with found letters", () => {
		const playerCipher: PlayerCipher = {
			"H": "H",
			"E": "E", 
			"L": "L",
			"O": "O"
		};

		const paragraphOfTheDay = "HELLO";
		const day = "2024-01-15";

		const gameSession = createGameSession(day, paragraphOfTheDay, playerCipher);

		expect(gameSession.winAt).toBe(day);
		expect(gameSession.lettersFound).toEqual(["H", "E", "L", "O"]);
	});

	it("should remove duplicate letters", () => {
		const playerCipher: PlayerCipher = {
			"L": "L",
			"O": "O"
		};

		const paragraphOfTheDay = "HELLO";
		const day = "2024-01-15";

		const gameSession = createGameSession(day, paragraphOfTheDay, playerCipher);

		expect(gameSession.winAt).toBe(day);
		expect(gameSession.lettersFound).toEqual(["L", "O"]);
	});
});

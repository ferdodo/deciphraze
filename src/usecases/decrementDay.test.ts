import { describe, it, expect } from "vitest";
import { decrementDay } from "./decrementDay";
import { withGameStarted } from "../fixtures/withGameStarted";
import { withFinishedGame } from "../fixtures/withFinishedGame";

describe("decrementDay", () => {
	it("should decrement day by 1", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = context.dayRepository.getDay();
		decrementDay(context);
		const newDay = context.dayRepository.getDay();
		
		const initialDate = new Date(initialDay);
		const expectedDate = new Date(initialDate);
		expectedDate.setDate(expectedDate.getDate() - 1);
		
		const expectedDay = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`;
		
		expect(newDay).toBe(expectedDay);
		cleanup();
	});
	it("should reset discovery order for the new day", () => {
		const [cleanup, context] = withGameStarted();
		const initialDay = context.dayRepository.getDay();
		
		// Ajouter des lettres à l'ordre de découverte du jour initial
		context.discoveryOrderRepository.addLetterToDiscoveryOrder(initialDay, "A");
		context.discoveryOrderRepository.addLetterToDiscoveryOrder(initialDay, "B");
		
		expect(context.discoveryOrderRepository.getDiscoveryOrder(initialDay).length).toBe(2);
		
		// Décrémenter le jour
		decrementDay(context);
		const newDay = context.dayRepository.getDay();
		
		// L'ordre de découverte du nouveau jour devrait être vide
		expect(context.discoveryOrderRepository.getDiscoveryOrder(newDay)).toEqual([]);
		
		cleanup();
	});

	it("should reset selections and playerCipher for development mode", () => {
		const [cleanup, context] = withGameStarted();
		
		// Sélectionner une lettre et un symbole
		context.letterSelectionRepository.selectLetter("A");
		context.symbolSelectionRepository.selectSymbol("X");
		
		// Ajouter des entrées au playerCipher
		context.playerCipherRepository.addPlayerCipherEntry("A", "X");
		context.playerCipherRepository.addPlayerCipherEntry("B", "Y");
		
		expect(context.letterSelectionRepository.getLetterSelection()).toBe("A");
		expect(context.symbolSelectionRepository.getSymbolSelection()).toBe("X");
		expect(Object.keys(context.playerCipherRepository.getPlayerCipher()).length).toBe(2);
		
		// Décrémenter le jour
		decrementDay(context);
		
		// Les sélections et le playerCipher devraient être réinitialisés
		expect(context.letterSelectionRepository.getLetterSelection()).toBeNull();
		expect(context.symbolSelectionRepository.getSymbolSelection()).toBeNull();
		expect(Object.keys(context.playerCipherRepository.getPlayerCipher()).length).toBe(0);
		
		cleanup();
	});

	it("should reset statistics before changing day to avoid counting twice", () => {
		const [cleanup, context] = withFinishedGame();
		
		// Vérifier que les statistiques ont été mises à jour après la partie gagnée
		const statsBefore = context.statisticsRepository.getStatistics();
		expect(statsBefore.totalGames).toBeGreaterThan(0);
		
		// Changer de jour
		decrementDay(context);
		
		// Les statistiques devraient être réinitialisées avec toutes les propriétés correctes
		const statsAfter = context.statisticsRepository.getStatistics();
		expect(statsAfter.totalGames).toBe(0);
		expect(statsAfter.totalWordsFound).toBe(0);
		expect(statsAfter.firstGameDate).toBeNull();
		expect(statsAfter.lastGameDate).toBeNull();
		expect(statsAfter.averageWordsPerGame).toBe(0);
		expect(statsAfter.letterPositions).toEqual([]);
		expect(Array.isArray(statsAfter.letterPositions)).toBe(true);
		expect(statsAfter.letterPositions.length).toBe(0);
		
		cleanup();
	});
});


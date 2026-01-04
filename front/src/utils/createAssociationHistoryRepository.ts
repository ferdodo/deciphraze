import type { AssociationHistoryRepository } from "../repositories/AssociationHistoryRepository";
import type { AssociationHistory } from "../entities/AssociationHistory";
import type { AssociationEntry } from "../entities/AssociationEntry";
import type { StorageLike } from "./StorageLike";

const ASSOCIATION_HISTORY_STORAGE_KEY = "deciphraze_association_history";

export function createAssociationHistoryRepository(storage: StorageLike): AssociationHistoryRepository {
	function loadAssociationHistory(): AssociationHistory {
		try {
			const stored = storage.getItem(ASSOCIATION_HISTORY_STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	}

	function saveAssociationHistory(history: AssociationHistory): void {
		storage.setItem(ASSOCIATION_HISTORY_STORAGE_KEY, JSON.stringify(history));
	}

	function getHistory(day: string): AssociationEntry[] {
		const allHistory = loadAssociationHistory();
		return allHistory[day] || [];
	}

	function addAssociation(day: string, letter: string, symbol: string, isCorrect: boolean): void {
		const allHistory = loadAssociationHistory();
		const dayHistory = allHistory[day] || [];
		
		const entry: AssociationEntry = {
			letter,
			symbol,
			isCorrect,
			timestamp: new Date().toISOString(),
			day
		};
		
		allHistory[day] = [...dayHistory, entry];
		saveAssociationHistory(allHistory);
	}

	function hasErrors(day: string): boolean {
		const dayHistory = getHistory(day);
		return dayHistory.some(entry => !entry.isCorrect);
	}

	function clear(): void {
		storage.removeItem(ASSOCIATION_HISTORY_STORAGE_KEY);
	}

	return {
		getHistory,
		addAssociation,
		hasErrors,
		clear
	};
}


import type { AssociationHistoryRepository } from "../repositories/AssociationHistoryRepository";
import type { AssociationEntry } from "../entities/AssociationEntry";

export function createAssociationHistoryRepositoryMock(): AssociationHistoryRepository {
	const history: Record<string, AssociationEntry[]> = {};

	function getHistory(day: string): AssociationEntry[] {
		return history[day] || [];
	}

	function addAssociation(day: string, letter: string, symbol: string, isCorrect: boolean): void {
		if (!history[day]) {
			history[day] = [];
		}
		history[day].push({
			letter,
			symbol,
			isCorrect,
			timestamp: new Date().toISOString(),
			day
		});
	}

	function hasErrors(day: string): boolean {
		const dayHistory = getHistory(day);
		return dayHistory.some(entry => !entry.isCorrect);
	}

	return {
		getHistory,
		addAssociation,
		hasErrors
	};
}


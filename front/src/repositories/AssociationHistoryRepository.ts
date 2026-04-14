import type { AssociationEntry } from "../entities/AssociationEntry";

export interface AssociationHistoryRepository {
	getHistory(day: string): AssociationEntry[];
	addAssociation(day: string, letter: string, symbol: string, isCorrect: boolean): void;
	hasErrors(day: string): boolean;
}

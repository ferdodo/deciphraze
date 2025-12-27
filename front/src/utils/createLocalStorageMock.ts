import type { StorageLike } from "./StorageLike";

/**
 * Crée un mock de localStorage pour les tests
 * @returns Un objet mock qui implémente l'interface StorageLike
 */
export function createLocalStorageMock(): StorageLike {
	const storage: Record<string, string> = {};

	return {
		getItem: (key: string): string | null => {
			return storage[key] || null;
		},
		setItem: (key: string, value: string): void => {
			storage[key] = value;
		},
		removeItem: (key: string): void => {
			delete storage[key];
		},
		clear: (): void => {
			for (const key of Object.keys(storage)) {
				delete storage[key];
			}
		},
		get length(): number {
			return Object.keys(storage).length;
		},
		key: (index: number): string | null => {
			const keys = Object.keys(storage);
			return keys[index] || null;
		}
	};
}


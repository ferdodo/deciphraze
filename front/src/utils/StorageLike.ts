/**
 * Interface représentant l'API localStorage
 */
export interface StorageLike {
	getItem(key: string): string | null;
	setItem(key: string, value: string): void;
	removeItem(key: string): void;
	clear(): void;
	readonly length: number;
	key(index: number): string | null;
}




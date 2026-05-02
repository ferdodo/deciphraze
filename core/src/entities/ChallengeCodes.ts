export interface ChallengeCodes {
	// Set of used codes (in-memory, not persisted to localStorage)
	// Prevents reusing the same code to unlock the daily letter
	usedCodes: Set<string>;
}

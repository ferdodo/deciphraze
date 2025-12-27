import type { StorageLike } from "./StorageLike";

/**
 * Obtient le localStorage par défaut ou retourne null
 * Utilisé comme valeur par défaut dans les repositories
 */
export function getDefaultStorage(): StorageLike | null {
	if (typeof localStorage !== 'undefined' && 
		typeof localStorage.getItem === 'function' &&
		typeof localStorage.setItem === 'function' &&
		typeof localStorage.removeItem === 'function') {
		return localStorage as StorageLike;
	}
	return null;
}




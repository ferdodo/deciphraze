import type { BrowserService } from "../services/BrowserService";

export function createBrowserServiceMock(): BrowserService {
	return {
		isPwaInstallable(): boolean {
			return false;
		},
		observePwaInstallable(callback: (isInstallable: boolean) => void): () => void {
			// Notifier immédiatement avec l'état par défaut
			callback(false);
			// Retourner une fonction de nettoyage vide
			return () => {
				// Pas de nettoyage nécessaire pour le mock
			};
		},
		installPwa(): void {
			// Pas d'action dans le mock
		},
		isInstalled(): boolean {
			return false;
		},
		getSupportStatus(): "supported" {
			return "supported" as const;
		},
		toggleFullscreen(): void {
			// Pas d'action dans le mock
		},
		applyPullToRefresh(_enabled: boolean): void {
			// Pas d'action dans le mock
		},
		confirm(_message: string): boolean {
			// Par défaut, retourner false dans le mock
			return false;
		},
	};
}


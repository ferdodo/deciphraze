import type { PwaService } from "../services/PwaService";

export function createPwaServiceMock(): PwaService {
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
	};
}


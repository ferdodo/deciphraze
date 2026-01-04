import type { PwaSupportStatus } from "./PwaSupportStatus";

interface BeforeInstallPromptEvent extends Event {
	prompt(): Promise<void>;
	readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Implémentation du service Browser
// L'interface est définie dans le frontend

export function createBrowserService(): {
	isPwaInstallable(): boolean;
	observePwaInstallable(callback: (isInstallable: boolean) => void): () => void;
	installPwa(): void;
	isInstalled(): boolean;
	getSupportStatus(): PwaSupportStatus;
	toggleFullscreen(): void;
} {
	let deferredPrompt: BeforeInstallPromptEvent | null = null;
	let isInstallable = false;
	const observers: Set<(isInstallable: boolean) => void> = new Set();

	function notifyObservers(): void {
		for (const callback of observers) {
			callback(isInstallable);
		}
	}

	function handleBeforeInstallPrompt(event: Event): void {
		event.preventDefault();
		deferredPrompt = event as BeforeInstallPromptEvent;
		isInstallable = true;
		notifyObservers();
	}

	// Écouter l'événement beforeinstallprompt
	if (typeof window !== "undefined") {
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
	}

	return {
		isPwaInstallable(): boolean {
			return isInstallable;
		},

		observePwaInstallable(callback: (isInstallable: boolean) => void): () => void {
			observers.add(callback);
			// Notifier immédiatement avec l'état actuel
			callback(isInstallable);

			// Retourner une fonction de nettoyage
			return (): void => {
				observers.delete(callback);
			};
		},

		installPwa(): void {
			if (!deferredPrompt) {
				return;
			}

			// Afficher l'invite d'installation native du navigateur
			deferredPrompt.prompt();

			// Attendre la réponse de l'utilisateur
			deferredPrompt.userChoice.then(() => {
				// Réinitialiser après utilisation
				deferredPrompt = null;
				isInstallable = false;
				notifyObservers();
			});
		},

		isInstalled(): boolean {
			if (typeof window === "undefined") {
				return false;
			}
			return window.matchMedia("(display-mode: standalone)").matches;
		},

		getSupportStatus(): PwaSupportStatus {
			if (typeof window === "undefined") {
				return "no-window";
			}
			if (typeof navigator === "undefined") {
				return "no-navigator";
			}
			// Vérifier si le contexte est sécurisé (HTTPS requis, sauf localhost)
			if (!window.isSecureContext) {
				return "no-https";
			}
			if (!("serviceWorker" in navigator)) {
				return "no-service-worker";
			}
			return "supported";
		},

		toggleFullscreen(): void {
			if (typeof document === "undefined") {
				return;
			}
			if (!document.fullscreenElement) {
				// Entrer en plein écran
				void document.documentElement.requestFullscreen();
			} else {
				// Sortir du plein écran
				void document.exitFullscreen();
			}
		},
	};
}


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
	togglePullToRefresh(): void;
	isPullToRefreshEnabled(): boolean;
	observePullToRefresh(callback: (enabled: boolean) => void): () => void;
} {
	let deferredPrompt: BeforeInstallPromptEvent | null = null;
	let isInstallable = false;
	const observers: Set<(isInstallable: boolean) => void> = new Set();

	// Gestion du pull-to-refresh
	const PULL_TO_REFRESH_KEY = "pullToRefreshEnabled";
	// Par défaut, le pull-to-refresh est activé
	let pullToRefreshEnabled = true;
	const pullToRefreshObservers: Set<(enabled: boolean) => void> = new Set();

	// Initialiser l'état depuis localStorage
	if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
		const stored = localStorage.getItem(PULL_TO_REFRESH_KEY);
		// Si une valeur est stockée, l'utiliser, sinon garder la valeur par défaut (true)
		if (stored !== null) {
			pullToRefreshEnabled = stored === "true";
		}
	}

	function applyPullToRefreshSettings(): void {
		if (typeof document === "undefined" || typeof window === "undefined") {
			return;
		}

		const body = document.body;
		const html = document.documentElement;

		if (pullToRefreshEnabled) {
			// Réactiver le pull-to-refresh
			body.style.overscrollBehaviorY = "";
			html.style.overscrollBehaviorY = "";
		} else {
			// Désactiver le pull-to-refresh avec CSS uniquement
			// overscroll-behavior-y: none empêche le pull-to-refresh sans affecter le scroll normal
			body.style.overscrollBehaviorY = "none";
			html.style.overscrollBehaviorY = "none";
		}
	}

	// Appliquer les paramètres au démarrage
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		// Attendre que le DOM soit prêt
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", applyPullToRefreshSettings);
		} else {
			applyPullToRefreshSettings();
		}
	}

	function notifyPullToRefreshObservers(): void {
		for (const callback of pullToRefreshObservers) {
			callback(pullToRefreshEnabled);
		}
	}

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

		togglePullToRefresh(): void {
			pullToRefreshEnabled = !pullToRefreshEnabled;
			// Sauvegarder dans localStorage
			if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
				localStorage.setItem(PULL_TO_REFRESH_KEY, String(pullToRefreshEnabled));
			}
			// Appliquer les changements immédiatement
			applyPullToRefreshSettings();
			notifyPullToRefreshObservers();
		},

		isPullToRefreshEnabled(): boolean {
			return pullToRefreshEnabled;
		},

		observePullToRefresh(callback: (enabled: boolean) => void): () => void {
			pullToRefreshObservers.add(callback);
			// Notifier immédiatement avec l'état actuel
			callback(pullToRefreshEnabled);

			// Retourner une fonction de nettoyage
			return (): void => {
				pullToRefreshObservers.delete(callback);
			};
		},
	};
}


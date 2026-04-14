import type { DeviceType } from "./DeviceType";

export function createBrowserService(): {
	getDevice(): DeviceType;
	toggleFullscreen(): void;
	applyPullToRefresh(enabled: boolean): void;
	confirm(message: string): boolean;
	clearStorage(): void;
	refreshPage(): void;
} {
	
	function getDevice(): DeviceType {
		if (typeof window === "undefined" || typeof navigator === "undefined") {
			return "unknown";
		}

		const userAgent = navigator.userAgent;
		const isMobile = /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
		
		// Détection iOS
		if (/iPhone|iPad|iPod/.test(userAgent)) {
			return "ios-safari";
		}
		
		// Détection Android
		if (/Android/.test(userAgent)) {
			if (/Firefox/.test(userAgent)) {
				return "android-firefox";
			} else if (/Edg/.test(userAgent)) {
				return "android-edge";
			} else if (/Chrome/.test(userAgent)) {
				return "android-chrome";
			}
		}
		
		// Détection Desktop
		if (!isMobile) {
			if (/Firefox/.test(userAgent)) {
				return "desktop-firefox";
			} else if (/Edg/.test(userAgent)) {
				return "desktop-edge";
			} else if (/Chrome/.test(userAgent)) {
				return "desktop-chrome";
			} else if (/Safari/.test(userAgent)) {
				return "desktop-safari";
			}
		}
		
		return "unknown";
	}

	function applyPullToRefreshSettings(enabled: boolean): void {
		if (typeof document === "undefined" || typeof window === "undefined") {
			return;
		}

		const body = document.body;
		const html = document.documentElement;

		if (enabled) {
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

	return {
		getDevice,

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

		applyPullToRefresh(enabled: boolean): void {
			applyPullToRefreshSettings(enabled);
		},

		confirm(message: string): boolean {
			if (typeof window === "undefined") {
				return false;
			}
			return window.confirm(message);
		},

		clearStorage(): void {
			if (typeof window === "undefined") {
				return;
			}

			window.localStorage.clear();
		},

		refreshPage(): void {
			if (typeof window === "undefined") {
				return;
			}

			window.location.reload();
		},
	};
}

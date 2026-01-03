import type React from "react";

export function DeciSettingsPanel(): React.JSX.Element {
	const handleToggleFullscreen = async (): Promise<void> => {
		try {
			if (document.fullscreenElement) {
				if (document.exitFullscreen) {
					await document.exitFullscreen();
				} else if ((document as unknown as { webkitExitFullscreen?: () => Promise<void> }).webkitExitFullscreen) {
					await (document as unknown as { webkitExitFullscreen: () => Promise<void> }).webkitExitFullscreen();
				} else if ((document as unknown as { mozCancelFullScreen?: () => Promise<void> }).mozCancelFullScreen) {
					await (document as unknown as { mozCancelFullScreen: () => Promise<void> }).mozCancelFullScreen();
				} else if ((document as unknown as { msExitFullscreen?: () => Promise<void> }).msExitFullscreen) {
					await (document as unknown as { msExitFullscreen: () => Promise<void> }).msExitFullscreen();
				}
			} else {
				const element = document.documentElement;
				if (element.requestFullscreen) {
					await element.requestFullscreen();
				} else if ((element as unknown as { webkitRequestFullscreen?: () => Promise<void> }).webkitRequestFullscreen) {
					await (element as unknown as { webkitRequestFullscreen: () => Promise<void> }).webkitRequestFullscreen();
				} else if ((element as unknown as { mozRequestFullScreen?: () => Promise<void> }).mozRequestFullScreen) {
					await (element as unknown as { mozRequestFullScreen: () => Promise<void> }).mozRequestFullScreen();
				} else if ((element as unknown as { msRequestFullscreen?: () => Promise<void> }).msRequestFullscreen) {
					await (element as unknown as { msRequestFullscreen: () => Promise<void> }).msRequestFullscreen();
				}
			}
		} catch (_error) {
			// Ignorer les erreurs (par exemple si l'utilisateur annule)
		}
	};

	return (
		<div style={{ padding: "1rem" }}>
			<crumbs-p>
				Paramètres
			</crumbs-p>
			<div style={{ marginTop: "2rem" }}>
				<crumbs-p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem" }}>
					Affichage
				</crumbs-p>
				<crumbs-button
					title="Plein écran"
					onClick={handleToggleFullscreen}
					role="button"
				>
					Plein écran
				</crumbs-button>
			</div>
		</div>
	);
}


import type { PwaSupportStatus } from "./PwaSupportStatus";

export interface BrowserService {
	isPwaInstallable(): boolean;
	observePwaInstallable(callback: (isInstallable: boolean) => void): () => void;
	installPwa(): void;
	isInstalled(): boolean;
	getSupportStatus(): PwaSupportStatus;
	toggleFullscreen(): void;
	applyPullToRefresh(enabled: boolean): void;
	confirm(message: string): boolean;
}

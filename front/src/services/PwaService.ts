export type PwaSupportStatus = "supported" | "no-service-worker" | "no-window" | "no-navigator" | "no-https";

export interface PwaService {
	isPwaInstallable(): boolean;
	observePwaInstallable(callback: (isInstallable: boolean) => void): () => void;
	installPwa(): void;
	isInstalled(): boolean;
	getSupportStatus(): PwaSupportStatus;
}


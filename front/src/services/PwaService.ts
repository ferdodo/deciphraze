import type { PwaSupportStatus } from "./PwaSupportStatus";

export interface PwaService {
	isPwaInstallable(): boolean;
	observePwaInstallable(callback: (isInstallable: boolean) => void): () => void;
	installPwa(): void;
	isInstalled(): boolean;
	getSupportStatus(): PwaSupportStatus;
}

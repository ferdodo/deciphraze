import type { DeviceType } from "./DeviceType";

export interface BrowserService {
	getDevice(): DeviceType;
	toggleFullscreen(): void;
	applyPullToRefresh(enabled: boolean): void;
	confirm(message: string): boolean;
}

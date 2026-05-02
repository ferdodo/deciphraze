import type { BrowserService, DeviceType } from "@deciphraze/core";

export function createBrowserServiceMock(deviceType: DeviceType = "unknown"): BrowserService {
	return {
		getDevice(): DeviceType {
			return deviceType;
		},
		toggleFullscreen(): void {
			// Mock implementation
		},
		applyPullToRefresh(): void {
			// Mock implementation
		},
		confirm(): boolean {
			return true;
		},
		clearStorage(): void {
			// Mock implementation
		},
		refreshPage(): void {
			// Mock implementation
		},
	};
}

import type { BrowserService } from "../services/BrowserService";
import type { DeviceType } from "../services/DeviceType";

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
	};
}

import { describe, it, expect } from "vitest";
import { createBrowserServiceMock } from "./createBrowserServiceMock";
import type { DeviceType } from "../services/DeviceType";

describe("createBrowserServiceMock", () => {
	it("should return a service with getDevice returning the specified device type", () => {
		const deviceType: DeviceType = "ios-safari";
		const service = createBrowserServiceMock(deviceType);
		expect(service.getDevice()).toBe(deviceType);
	});

	it("should return 'unknown' device type by default", () => {
		const service = createBrowserServiceMock();
		expect(service.getDevice()).toBe("unknown");
	});

	it("should return true for confirm method", () => {
		const service = createBrowserServiceMock();
		expect(service.confirm("test")).toBe(true);
	});
});


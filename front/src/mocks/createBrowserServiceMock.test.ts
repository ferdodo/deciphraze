import { describe, it, expect } from "vitest";
import { createBrowserServiceMock } from "./createBrowserServiceMock";

describe("createBrowserServiceMock", () => {
	it("should return a service with isPwaInstallable returning false", () => {
		const service = createBrowserServiceMock();
		expect(service.isPwaInstallable()).toBe(false);
	});

	it("should call the callback immediately with false when observing", () => {
		const service = createBrowserServiceMock();
		let callbackCalled = false;
		let receivedValue: boolean | undefined;

		const unsubscribe = service.observePwaInstallable((isInstallable) => {
			callbackCalled = true;
			receivedValue = isInstallable;
		});

		expect(callbackCalled).toBe(true);
		expect(receivedValue).toBe(false);
		expect(typeof unsubscribe).toBe("function");
	});

	it("should return true for isPullToRefreshEnabled by default", () => {
		const service = createBrowserServiceMock();
		expect(service.isPullToRefreshEnabled()).toBe(true);
	});

	it("should call the callback immediately with true when observing pull-to-refresh", () => {
		const service = createBrowserServiceMock();
		let callbackCalled = false;
		let receivedValue: boolean | undefined;

		const unsubscribe = service.observePullToRefresh((enabled) => {
			callbackCalled = true;
			receivedValue = enabled;
		});

		expect(callbackCalled).toBe(true);
		expect(receivedValue).toBe(true);
		expect(typeof unsubscribe).toBe("function");
	});

});


import { describe, it, expect } from "vitest";
import { createPwaServiceMock } from "./createPwaServiceMock";

describe("createPwaServiceMock", () => {
	it("should return a service with isPwaInstallable returning false", () => {
		const service = createPwaServiceMock();
		expect(service.isPwaInstallable()).toBe(false);
	});

	it("should call the callback immediately with false when observing", () => {
		const service = createPwaServiceMock();
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

});


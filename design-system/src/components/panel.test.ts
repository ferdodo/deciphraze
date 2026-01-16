import { describe, beforeAll, expect, test } from "vitest";
import { getShadowRoot } from "../utils/get-shadow-root";
import "./panel";

describe("<crumbs-panel>", () => {
	beforeAll(async () => {
		await customElements.whenDefined("crumbs-panel");
	});

	test("should create panel element with shadow root", async () => {
		const panel = document.createElement("crumbs-panel");
		document.body.appendChild(panel);
		expect(panel).toBeDefined();
		expect(panel.tagName.toLowerCase()).toBe("crumbs-panel");
		const shadowRoot = getShadowRoot(panel);
		expect(shadowRoot).toBeDefined();
		document.body.removeChild(panel);
	});
});

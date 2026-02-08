import { describe, beforeAll, expect, test } from "vitest";
import { defineNavCustomElement } from "./nav";

describe("<crumbs-nav>", () => {
	beforeAll(async () => {
		await defineNavCustomElement();
	});

	test("should mount successfully", async () => {
		const nav = document.createElement("crumbs-nav");
		document.body.appendChild(nav);

		// Ensure the custom element has had time to connect and attach its shadow DOM
		await new Promise(resolve => setTimeout(resolve, 0));

		expect(nav).toBeInstanceOf(HTMLElement);
		expect(nav.shadowRoot).not.toBeNull();
		expect(nav.shadowRoot?.querySelector('#content')).not.toBeNull(); // Check for internal content

		document.body.removeChild(nav); // Clean up
	});
});

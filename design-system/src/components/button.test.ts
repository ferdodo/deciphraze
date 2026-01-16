import { within } from "@testing-library/dom";
import { describe, beforeAll, expect, test } from "vitest";
import { generateShadowRootFirstHTMLElement as html } from "../utils/generate-shadow-root-first-html-element";
import { defineButtonCustomElement } from "./button";

describe("<crumbs-button>", () => {
	beforeAll(async () => {
		await defineButtonCustomElement();
	});

	test("should be enabled by default", async () => {
		const button = html`<crumbs-button> content </crumbs-button>`;
		const innerButton: HTMLButtonElement = within(button).getByRole("button", { hidden: true });
		expect(innerButton.disabled).toBe(false);
	});

	test("should be disabled when having disabled attribute", async () => {
		const button = html`<crumbs-button disabled> content </crumbs-button>`;
		const innerButton: HTMLButtonElement = within(button).getByRole("button", { hidden: true });
		expect(innerButton.disabled).toEqual(true);
	});

	test("should be enabled when having disabled explicitly false", async () => {
		const button = html`<crumbs-button disabled="false"> content </crumbs-button>`;
		const innerButton: HTMLButtonElement = within(button).getByRole("button", { hidden: true });
		expect(innerButton.disabled).toEqual(false);
	});

	test("should be loading when having loading attribute", async () => {
		const button = html`<crumbs-button progress="50"> content </crumbs-button>`;
		const progress = within(button).getByRole("progressbar", { hidden: true });
		const value = progress.getAttribute("value");
		expect(value).toEqual("50");
	});

	test("should not be loading with out of range superior number", async () => {
		const button = html`<crumbs-button progress="101"> content </crumbs-button>`;
		const progress = within(button).getByRole("progressbar", { hidden: true });
		const value = progress.getAttribute("value");
		expect(value).toEqual("0");
	});

	test("should be loaded when progress is 100", async () => {
		const button = html`<crumbs-button progress="100"> content </crumbs-button>`;
		const progress = within(button).getByRole("progressbar", { hidden: true });
		const value = progress.getAttribute("value");
		expect(value).toEqual("100");
	});

	test("should display indeterministic progress on indeterminate progress", async () => {
		const button = html`<crumbs-button indeterminate-progress> content </crumbs-button>`;
		const progress = within(button).getByRole("progressbar", { hidden: true });
		const value = progress.hasAttribute("value");
		expect(value).toEqual(false);
	});
});


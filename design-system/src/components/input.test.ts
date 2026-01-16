import { describe, beforeAll, expect, test } from "vitest";
import { generateWebComponentAndFirstChild as html } from "../utils/generate-web-component-and-first-child";
import { defineInputCustomElement } from "./input";
import "@testing-library/dom";

describe("<crumbs-input>", () => {
    beforeAll(async () => {
        await defineInputCustomElement();
    });
    
    test("should bind value to input", async () => {
        const [crumbInput, input] = html`<crumbs-input value="hello" />`;

        if (!(input instanceof HTMLInputElement)) {
            throw new Error("Element is not input !");
        }

        expect(input.value).toEqual("hello");
        crumbInput.setAttribute("value", "there");
        expect(input.value).toEqual("there");
    });
});


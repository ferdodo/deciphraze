import { getShadowRoot } from "./get-shadow-root";

export function generateShadowRootFirstHTMLElement(
	strings: TemplateStringsArray,
	...values: unknown[]
): HTMLElement {
	const html = strings.map((str, i) => str + (values[i] ?? "")).join("");

	const div = document.createElement("div");
	div.innerHTML = html;
	document.body.appendChild(div);

	if (div.firstElementChild === null) {
		throw new Error("Failed to create element from HTML !");
	}

	if (!(div.firstElementChild instanceof HTMLElement)) {
		throw new Error("Element is not an instance of HTMLElement !");
	}

	const shadowRoot = getShadowRoot(div.firstElementChild);
	const secondElementFromShadowRoot = shadowRoot.children[1];

	if (!(secondElementFromShadowRoot instanceof HTMLElement)) {
		throw new Error("Element is not an instance of HTMLElement !");
	}

	return secondElementFromShadowRoot;
}

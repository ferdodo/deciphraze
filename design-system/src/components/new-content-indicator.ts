import htm from "htm/mini";
import h from "hyperscript";
import { createTemplate, getShadowRoot } from "../utils";

const html = htm.bind(h);
const tagName = "crumbs-new-content-indicator";

declare global {
	export namespace JSX {
		export interface IntrinsicElements {
			[tagName]: undefined;
		}
	}
}

const template = createTemplate(html`
	<style>
		:host {
			position: absolute;
			width: 0;
			height: 0;
			top: 50%;
			right: -0.5rem;
		}

		.container {
			position: relative;
		}

		.indicator {
			position: absolute;
			top: -0.25rem;
			right: -0.25rem;
			width: 0.5rem;
			height: 0.5rem;
			background-color: #4c94ff;
			border-radius: 50%;
			animation: pulse 2s infinite;
			box-shadow: 0 0 0 0 rgba(100, 172, 255, 0.7);
		}

		@keyframes pulse {
			0% {
				transform: scale(1);
				opacity: 1;
				box-shadow: 0 0 0 0 rgba(100, 172, 255, 0.7);
			}
			50% {
				transform: scale(1.2);
				opacity: 0.8;
				box-shadow: 0 0 0 0.5rem rgba(255, 107, 107, 0);
			}
			100% {
				transform: scale(1);
				opacity: 1;
				box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
			}
		}
	</style>

	<div className="container">
		<div className="indicator"></div>
	</div>
`);

class NewContentIndicator extends HTMLElement {
	async connectedCallback() {
		this.attachShadow({ mode: "open" });
		const shadowRoot = getShadowRoot(this);
		const clonedTemplate = template.content.cloneNode(true);
		shadowRoot.appendChild(clonedTemplate);
	}
}

customElements.define(tagName, NewContentIndicator);

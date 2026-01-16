import htm from "htm/mini";
import h from "hyperscript";
import { createTemplate, getShadowRoot } from "../utils";

const html = htm.bind(h);
const tagName = "crumbs-frame";

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
            display: block;
        }

        .frameold {
			border: 2px inset #0000001c;
            border-radius: 6px;
            padding: 1rem;
            margin: 1rem;
            background-color: #ffffff26;
        }

        .frame {
            padding: 3rem;
        }
    </style>

    <div className="frame">
        <slot></slot>
    </div>
`);

class Frame extends HTMLElement {
    async connectedCallback() {
        this.attachShadow({ mode: "open" });
        const shadowRoot = getShadowRoot(this);
        const clonedTemplate = template.content.cloneNode(true);
        shadowRoot.appendChild(clonedTemplate);
    }
}

customElements.define(tagName, Frame);

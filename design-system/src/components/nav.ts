import htm from "htm/mini";
import h from "hyperscript";
import { type Subscription, fromEvent, map } from "rxjs";
import { createTemplate, getShadowRoot } from "../utils";

const html = htm.bind(h);
const tagName = "crumbs-nav";

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

		.selected-title {
			background: rgba(255, 255, 255, 0.45);
			border-radius: 0.3rem;
			animation: fadeInBackground 0.2s ease-in-out;
		}

		#navbar {
			display: flex;
			justify-content: space-around;
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.44) 100%);
			border-radius: 0.3rem;
			box-shadow: 2px 10px 50px 5px rgba(26, 25, 25, 0.47);
			margin: 1rem;
			padding: 1rem;

			/*backdrop-filter: blur(0.3rem);*/

			& > div {
				flex-grow: 1;
				display: grid;
				place-content: center;
				padding: 1rem;
				cursor: pointer;
				width: max-content;
				user-select: none;
				padding-bottom: 0;
				padding-top: 0;
			}
		}

		.content {
			display: grid;
			grid-auto-flow: column;
			overflow: scroll;
			grid-auto-columns: 100%;
			scroll-snap-type: x mandatory;
			scroll-behavior: smooth;
			-ms-overflow-style: none;
			scrollbar-width: none;

			& > div {
				scroll-snap-align: start;
				display: grid;
				place-content: center;
				overflow: hidden;

				& > div {
					transition: transform 0.1s ease;
					display: grid;
					place-content: center;
				}
			}
		}

		.content-nav-mode {
			& > div {
				& > div {
					transform: scale(0.5);

					&:hover {
						transform: scale(0.6);
					}
				}
			}
		}

		.content-nav-mode2 {
			grid-auto-flow: initial;
			grid-template-columns: repeat(auto-fit, 32%);
			grid-template-rows: repeat(auto-fit, 32%);
			gap: 1px;
			justify-content: space-around;

			& > div {
				& > div {
					width: 100vw;
				}
			}
		}

		#content::-webkit-scrollbar {
			display: none;
		}

		#container {
			display: grid;
			grid-template-rows: 1fr auto;
			height: 100%;
		}

		.nav-title-wrapper {
			min-height: 3.5rem;
		}

		@keyframes fadeInBackground {
			from {
				background: rgba(255, 255, 255, 0.01);
			}
			to {
				background: rgba(255, 255, 255, 0.45);
			}
		}
	</style>

	<div id="container">
		<div id="content" className="content"></div>
		<div id="navbar"></div>
	</div>
`);

class Nav extends HTMLElement {
	selected = 1;
	subscriptions: Subscription[] = [];
	navOpen: boolean = false;

	async connectedCallback() {
		this.attachShadow({ mode: "open" });
		const shadowRoot = getShadowRoot(this);
		const clonedTemplate = template.content.cloneNode(true);
		shadowRoot.appendChild(clonedTemplate);
		const selected = this.getAttribute("selected");
		this.selected = Number.parseInt(selected || "1", 10);
		const content = shadowRoot.querySelector("#content");
		const navbar = shadowRoot.querySelector("#navbar");

		if (!(content instanceof HTMLElement)) {
			throw new Error("Content is not HTMLElement !");
		}

		if (!(navbar instanceof HTMLElement)) {
			throw new Error("navbar is not HTMLElement !");
		}

		for (const slotName of { [Symbol.iterator]: () => this.getSlots() }) {
			if (slotName.startsWith("content-")) {
				const slot = html`<div id=${`${slotName}`}> <div> <slot name=${slotName}></slot> </div> </div>`;

				if (slot instanceof HTMLElement && content instanceof HTMLElement) {
					content.appendChild(slot);

					this.subscriptions.push(
						fromEvent<MouseEvent>(slot, "click").subscribe((event: MouseEvent) => {
							if (!this.navOpen) {
								return;
							}

							event.stopPropagation();
							event.preventDefault();

							const target = event.target;

							if (target instanceof HTMLElement) {

								setTimeout(() => {
									target.scrollIntoView({
										behavior: "instant"
									});
								}, 50);
								
								this.navOpen = false;
								this.render();
							}
						})
					)

				}
			}

			if (slotName.startsWith("title-")) {
				const slot = html`<div id=${slotName} className="nav-title-wrapper"> <span> <slot name=${slotName}></slot> </span> </div>`;

				if (slot instanceof Element) {
					navbar.appendChild(slot);

					this.subscriptions.push(
						fromEvent<MouseEvent>(slot, "click").subscribe((event: MouseEvent) => {
							if (this.navOpen) {
								return;
							}

							const contentName = slotName.replace("title-", "content-");
							const target = shadowRoot.querySelector(`#${contentName}`);

							if (target instanceof HTMLElement) {
								target.scrollIntoView({
									behavior: "smooth",
									block: "nearest",
									inline: "center"
								});
							}
						})
					)
				}
			}

			if (slotName.startsWith("navigation-toggle")) {
				const slot = html`<div id=${slotName} className="nav-title-wrapper"> <span> <slot name=${slotName}></slot> </span> </div>`;

				if (slot instanceof Element) {
					navbar.appendChild(slot);

					this.subscriptions.push(
						fromEvent<MouseEvent>(slot, "click").subscribe((event: MouseEvent) => {
							if (this.navOpen) {
								return;
							}

							const target = shadowRoot.querySelector(`#${slotName}`);

							if (target instanceof HTMLElement) {
								this.navOpen = true;
								this.render();
							}
						})
					)
				}
			}
		}

		// Ajouter un listener sur l'événement scroll pour mettre à jour l'élément sélectionné
		this.subscriptions.push(
			fromEvent(content, "scroll")
				.pipe(
					map(() => {
						const scrollLeft = content.scrollLeft;
						const clientWidth = content.clientWidth;
						const visibleIndex = Math.round(scrollLeft / clientWidth) + 1;
						
						// Vérifier que l'index est valide
						const contentSlots = Array.from(content.children).filter(
							(child) => child.id && child.id.startsWith("content-")
						);
						if (visibleIndex >= 1 && visibleIndex <= contentSlots.length) {
							return visibleIndex;
						}
						return null;
					})
				)
				.subscribe((visibleIndex) => {
					if (!this.navOpen && visibleIndex !== null) {
						this.selected = visibleIndex;
						this.render();
					}
				})
		);

		this.render();
	}

	async render() {
		const shadowRoot = getShadowRoot(this);
		const content: HTMLElement | null = shadowRoot.querySelector("#content");
		const navbar = shadowRoot.querySelector("#navbar");

		if (!content) {
			throw new Error("Content not found");
		}

		if (!(navbar instanceof HTMLElement)) {
			throw new Error("navbar is not HTMLElement !");
		}

		navbar.style.visibility = this.navOpen ? "hidden": "visible";

		[...navbar.children].forEach((title) => {
			const id = Number.parseInt(title.id.split('-')[1]);

			if (id === this.selected) {
				if (title instanceof HTMLElement) {
					title.classList.add("selected-title");
				}
			} else {
				if (title instanceof HTMLElement) {
					title.classList.remove("selected-title");
				}
			}
		});

		content.style.willChange = "auto";

		for (const slotName of { [Symbol.iterator]: () => this.getSlots() }) {
			if (slotName.startsWith("content-")) {
				const slot = shadowRoot.querySelector(slotName);

				if (slot instanceof HTMLElement) {
					slot.style.willChange = "auto";
				}
			}
		}

		await new Promise(r => setTimeout(r, 5));

		if (this.navOpen) {
			content.classList.add("content-nav-mode");
			await new Promise(r => setTimeout(r, 105));
		} else {
			content.classList.remove("content-nav-mode2");
		}

		if (this.navOpen) {
			content.classList.add("content-nav-mode2");
		} else {
			content.classList.remove("content-nav-mode");
		}

		for (const slotName of { [Symbol.iterator]: () => this.getSlots() }) {
			if (slotName.startsWith("content-")) {
				const slot = shadowRoot.querySelector(slotName);

				if (slot instanceof HTMLElement) {
					slot.style.willChange = "initial";
				}
			}
		}

		content.style.willChange = "initial";
	}

	disconnectedCallback() {
		for (const subscription of this.subscriptions) {
			subscription.unsubscribe();
		}
	}

	*getSlots(): Iterator<string> {
		for (const child of Array.from(this.children)) {
			const slot = child.getAttribute("slot");

			if (slot) {
				yield slot;
			}
		}
	}
}

customElements.define(tagName, Nav);

import htm from "htm/mini";
import h from "hyperscript";
import { type Subscription, fromEvent, map } from "rxjs";
import { appReady, createTemplate, getElement, getShadowRoot } from "../utils";

const html = htm.bind(h);
const tagName = "crumbs-panel";

declare global {
	export namespace JSX {
		export interface IntrinsicElements {
			[tagName]: {
				"panel-loading"?: string;
				"panel-title"?: string;
			};
		}
	}
}

const template = createTemplate(html`
	<style>
		:host {
			display: block;
		}

		#panel-container {
			display: grid;
			grid-column-gap: 0px;
			grid-row-gap: 0px;
			grid-template-columns: 1rem 1fr 1rem;
			grid-template-rows: 1rem 1fr 1rem;
			animation: fadein .5s cubic-bezier(.12,1.03,.11,.99);
			height: 100%;
		}

		@keyframes fadein {
			from {
				opacity: 0;
				transform: scale(0.75) translateY(-11%);
			}
			to {
				opacity: 1;
				transform: scale(1) translateY(0);
			}
		}

		#panel {
			border-radius: 0.3rem;
			padding: 1.7rem;
			padding-top: 0;
			padding-bottom: 0;
			grid-area: 2 / 2 / 3 / 3;
			background-color: #ffffff00;
			box-shadow: 0px 0px 9px 5px rgba(28, 44, 83, 0.04);
			box-shadow: 2px 10px 50px 5px rgba(26, 25, 25, 0.47);
			transition: background-color .5s cubic-bezier(.12,1.03,.11,.99);
			color: black;
			overflow: hidden;
			position: relative;
		}

		#panel-title-container {
			grid-area: 2 / 2 / 3 / 3;
			z-index: 0;
		}

		#panel-content {
			transition: opacity 1s cubic-bezier(.12,1.03,.11,.99);
			z-index: 1;
			position: relative;
			grid-area: 2 / 2 / 3 / 3;
			padding-top: 2.5rem;
			padding-bottom: 2.5rem;
			padding-left: 2.5rem;
			padding-right: 2.5rem;
			overflow: auto;
		}

		#panel-footer-wrapper {
			grid-area: 2 / 2 / 3 / 3;
			z-index: 2;
			position: relative;
			padding: 0 1.7rem 1.7rem 1.7rem;
			display: flex;
			align-items: flex-end;
			pointer-events: none;

			& > * {
				pointer-events: auto;
			}
		}

		#panel-loading-container {
			grid-area: 2 / 2 / 3 / 3;
			overflow: hidden;
			/*backdrop-filter: blur(0.3rem);*/
		}

		#panel-title {
			background: linear-gradient(0deg, rgba(255, 255, 255, 0.46) 0%, rgba(255, 255, 255, 0.44) 100%);
			display: inline-block;
			border-radius: 0.3rem;
			padding-left: 1rem;
			padding-right: 1rem;
			opacity: 0;
			transition-duration: 0.5s;
			transition-timing-function: cubic-bezier(.12,1.03,.11,.99);
			transition-delay: 0.4s;
			transition-property: opacity;
			z-index: 3;
		}

		#panel-loading {
			border-radius: 0.3rem;
			width: 75%;
			height: 100%;
			background-color: #ffffff55;
			box-shadow: 0px 0px 9px 5px rgba(28, 44, 83, 0.04);

			transition-duration: 1s;
			transition-timing-function: cubic-bezier(.17,.84,.44,1);
			transition-delay: 0s;
			transition-property: width, background-color;

			color: black;
			overflow: auto;

			position: relative;
		}

		* {
			scrollbar-width: auto;
			scrollbar-color: #ffffff90 #ffffff00;
		}

		*::-webkit-scrollbar {
			width: 8px;
		}

		*::-webkit-scrollbar-track {
			background: #ffffff00;
		}

		*::-webkit-scrollbar-thumb {
			background-color: #ffffff90;
			border-radius: 10px;
			border: 3px solid #ffffff00;
		}
	</style>

	<div id="panel-container">
		<div id="panel-loading-container">
			<div id="panel-loading"></div>
		</div>

		<div id="panel">
		</div>

		<div id="panel-content" style="opacity: 0;">
			<slot></slot>
		</div>

		<div id="panel-footer-wrapper">
			<slot name="footer"></slot>
		</div>

		<div id="panel-title-container">
			<div id="panel-title">
				<crumbs-p style="line-height: 0;">
					<b id="panel-title-content"> </b>
				</crumbs-p>
			</div>
		</div>
	</div>
`);

class Panel extends HTMLElement {
	contentTimeoutElapsed = false;
	contentLoaded = false;
	connected = false;
	loading = "100";
	scrolled = false;
	scrolledSubscription: Subscription | null = null;

	static get observedAttributes() {
		return ["panel-loading", "panel-title"];
	}

	async connectedCallback() {
		this.attachShadow({ mode: "open" });
		await appReady;
		const shadowRoot = getShadowRoot(this);
		const clonedTemplate = template.content.cloneNode(true);
		shadowRoot.appendChild(clonedTemplate);
		const loading: string | null = this.getAttribute("panel-loading");

		if (loading !== null && isLoadingValid(loading)) {
			this.loading = loading;
		}

		setTimeout(() => {
			const panelContainer: HTMLElement = getElement(
				shadowRoot,
				"#panel-container",
			);

			const panel: HTMLElement = getElement(shadowRoot, "#panel");
			panel.style.backgroundColor = "rgba(255, 255, 255, 0.37)";

			const panelContent: HTMLElement = getElement(shadowRoot, "#panel-content");
			this.scrolledSubscription = fromEvent(panelContent, "scroll")
				.pipe(
					map((e: Event) => (e.target as HTMLElement).scrollTop),
					// startWith(0),
					map((scrollTop: number) => scrollTop !== 0),
					// distinctUntilChanged()
				)
				.subscribe((value: boolean) => {
					this.scrolled = value;
					this.render();
				});

			this.render();
		}, 10);

		setTimeout(() => {
			this.contentTimeoutElapsed = true;
			this.render();
		}, 200);

		this.connected = true;
		this.render();
	}

	render() {
		const shadowRoot: ShadowRoot = getShadowRoot(this);
		const panelContent: HTMLElement = getElement(shadowRoot, "#panel-content");
		const panelLoading: HTMLElement = getElement(shadowRoot, "#panel-loading");
		const panel: HTMLElement = getElement(shadowRoot, "#panel");

		const panelTitleContent: HTMLElement = getElement(
			shadowRoot,
			"#panel-title-content",
		);

		const panelFooterWrapper: HTMLElement = getElement(shadowRoot, "#panel-footer-wrapper");
		const footerSlot: HTMLSlotElement | null = shadowRoot.querySelector('slot[name="footer"]');

		// Vérifier si le slot footer a du contenu assigné
		if (footerSlot && footerSlot.assignedElements().length > 0) {
			panelFooterWrapper.style.display = "flex";
			panelContent.style.paddingBottom = "5.8rem";
			panelContent.style.mask = "linear-gradient(0deg,rgba(255, 255, 255, 0) 4.5rem, rgba(0, 0, 0, 1) 7rem)";
		} else {
			panelFooterWrapper.style.display = "none";
			panelContent.style.paddingBottom = "2.5rem";
			panelContent.style.mask = "none";
		}

		if (this.contentTimeoutElapsed && isLoaded(this.loading)) {
			panelContent.style.opacity = "1";
			panelContent.style.overflow = "auto";
		} else {
			panelContent.style.opacity = "0";
			panelContent.style.overflow = "hidden";
		}

		panelLoading.style.width = `${this.loading}%`;

		const panelTitle: HTMLElement = getElement(shadowRoot, "#panel-title");

		if (
			this.loading === "100" &&
			this.getAttribute("panel-title") &&
			!this.scrolled
		) {
			setTimeout(() => {
				panelTitle.style.opacity = "1";
				panelTitleContent.innerHTML = this.getAttribute("panel-title") || "";
			}, 10);
		} else {
			panelTitle.style.opacity = "0";
		}
	}

	attributeChangedCallback() {
		if (this.shadowRoot && this.connected) {
			const loading: string | null = this.getAttribute("panel-loading");

			if (loading !== null && isLoadingValid(loading)) {
				this.loading = loading;
			} else if (loading === null) {
				this.loading = "100";
			}

			this.render();
		}
	}

	disconnectedCallback() {
		this.scrolledSubscription?.unsubscribe();
	}
}

function isLoadingValid(loading: string | null): boolean {
	const loadingAsNumber: number = Number(loading);
	const rounded: number = Math.floor(loadingAsNumber);

	return (
		rounded === loadingAsNumber &&
		Number.isInteger(rounded) &&
		Number.isFinite(rounded) &&
		rounded <= 100 &&
		rounded >= 0
	);
}

function isLoaded(loading: string | null): boolean {
	return loading === null || loading === "100";
}

customElements.define(tagName, Panel);

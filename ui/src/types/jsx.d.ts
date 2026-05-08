import "react";

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"crumbs-panel": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-h1": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLHeadingElement>,
				HTMLHeadingElement
			>;
			"crumbs-p": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLParagraphElement>,
				HTMLParagraphElement
			>;
			"crumbs-button": React.DetailedHTMLProps<
				React.ButtonHTMLAttributes<HTMLButtonElement>,
				HTMLButtonElement
			>;
			"crumbs-nav": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-new-content-indicator": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
			"crumbs-input": React.DetailedHTMLProps<
				React.InputHTMLAttributes<HTMLInputElement>,
				HTMLInputElement
			>;
		}
	}
}


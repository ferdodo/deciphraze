import type React from "react";
import styles from "./DeciText.module.css";

interface DeciTextProps {
	children: React.ReactNode;
	variant: "muted" | "sectionTitle";
}

export function DeciText({ 
	children, 
	variant
}: DeciTextProps): React.JSX.Element {
	
	const classNames = [
		styles.text,
		styles[`text_${variant}`]
	].filter(Boolean).join(" ");

	return (
		<p className={classNames}>
			{children}
		</p>
	);
}

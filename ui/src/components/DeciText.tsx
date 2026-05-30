import type React from "react";
import styles from "./DeciText.module.css";

interface DeciTextProps {
	children: React.ReactNode;
	variant?: "default" | "muted" | "sectionTitle" | "command" | "primary";
}

export function DeciText({ 
	children, 
	variant
}: DeciTextProps): React.JSX.Element {
	
	const classNames = [
		styles.text,
		variant && variant !== "default" ? styles[`text_${variant}`] : undefined
	].filter(Boolean).join(" ");

	return (
		<p className={classNames}>
			{children}
		</p>
	);
}

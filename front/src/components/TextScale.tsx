import type React from "react";
import { useSettings } from "../hooks/useSettings";

interface TextScaleProps {
	children: React.ReactNode;
}

export function TextScale({ children }: TextScaleProps): React.JSX.Element {
	const settings = useSettings();

	return (
		<div style={{ 
			"--deci-ui-text-size": settings.textSize,
			"--deci-ui-command-text-size": settings.commandTextSize
		} as React.CSSProperties}>
			{children}
		</div>
	);
}

import type React from "react";
import { deciUiContext } from "@deciphraze/ui";
import { useSettings } from "../hooks/useSettings";

interface DeciUiProviderProps {
	children: React.ReactNode;
}

export function DeciUiProvider({ children }: DeciUiProviderProps): React.JSX.Element {
	const settings = useSettings();

	const contextValue = {
		textSize: settings.textSize,
		commandTextSize: settings.commandTextSize,
	};

	return (
		<deciUiContext.Provider value={contextValue}>
			{children}
		</deciUiContext.Provider>
	);
}

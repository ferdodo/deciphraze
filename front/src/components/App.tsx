import type React from "react";
import { DeciApp } from "@deciphraze/ui";
import { Game } from "./Game";
import { GameContextProvider } from "../contexts/GameContextProvider";

export function App(): React.JSX.Element {
	return (
		<DeciApp>
			<GameContextProvider>
				<Game />
			</GameContextProvider>
		</DeciApp>
	);
};
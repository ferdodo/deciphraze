import type React from "react";
import { DeciApp } from "@deciphraze/ui";
import { Game } from "./Game";
import { GameContextProvider } from "../contexts/GameContextProvider";
import { TextScale } from "./TextScale";

export function App(): React.JSX.Element {
	return (
		<DeciApp>
			<GameContextProvider>
				<TextScale>
					<Game />
				</TextScale>
			</GameContextProvider>
		</DeciApp>
	);
};
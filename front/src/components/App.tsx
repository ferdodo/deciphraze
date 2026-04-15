import type React from "react";
import { DeciApp } from "@deciphraze/ui";
import { CurrentDayProvider } from "../contexts/CurrentDayProvider";
import { GameContextProvider } from "../contexts/GameContextProvider";
import { Game } from "./Game";
import { TextScale } from "./TextScale";

export function App(): React.JSX.Element {
	return (
		<DeciApp>
			<GameContextProvider>
				<CurrentDayProvider>
					<TextScale>
						<Game />
					</TextScale>
				</CurrentDayProvider>
			</GameContextProvider>
		</DeciApp>
	);
};

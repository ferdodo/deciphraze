import type React from "react";
import { DeciApp } from "@deciphraze/ui";
import { CurrentDayProvider } from "../contexts/CurrentDayProvider";
import { GameContextProvider } from "../contexts/GameContextProvider";
import { ParagraphOfTheDayProvider } from "../contexts/ParagraphOfTheDayProvider";
import { Game } from "./Game";
import { TextScale } from "./TextScale";

export function App(): React.JSX.Element {
	return (
		<DeciApp>
			<GameContextProvider>
				<CurrentDayProvider>
					<ParagraphOfTheDayProvider>
						<TextScale>
							<Game />
						</TextScale>
					</ParagraphOfTheDayProvider>
				</CurrentDayProvider>
			</GameContextProvider>
		</DeciApp>
	);
};

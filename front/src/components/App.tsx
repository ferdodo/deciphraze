import { DeciApp } from "@deciphraze/ds";
import { Game } from "./Game";
import { GameContextProvider } from "../contexts/GameContextProvider";

export function App(): JSX.Element {
	return (
		<DeciApp>
			<GameContextProvider>
				<Game />
			</GameContextProvider>
		</DeciApp>
	);
};
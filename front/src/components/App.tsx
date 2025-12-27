import type React from "react";
import { Game } from "./Game";
import { GameContextProvider } from "../contexts/GameContextProvider";
import styles from "./App.module.css";


export const App: React.FC = () => {
	return (
		<div className={styles.app}>
			<GameContextProvider>
				<Game />
			</GameContextProvider>
		</div>
	);
};
import type React from "react";
import { createRoot, type Root } from "react-dom/client";
import { Game } from "./components/Game";
import { GameContextProvider } from "./contexts/GameContextProvider";
import "crumbs-design-system";
import "./styles/global.module.css";


const App: React.FC = () => {
	return (
		<GameContextProvider>
			<Game />
		</GameContextProvider>
	);
};

const container: HTMLElement = document.body;
const root: Root = createRoot(container);
root.render(<App />);

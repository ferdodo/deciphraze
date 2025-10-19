import type React from "react";
import { createRoot, type Root } from "react-dom/client";
import { Game } from "./components/Game";
import { GameProvider } from "./providers/GameProvider";
import "crumbs-design-system";
import "./styles/global.module.css";


const App: React.FC = () => {
	return (
		<GameProvider>
			<Game />
		</GameProvider>
	);
};

const container: HTMLElement = document.body;
const root: Root = createRoot(container);
root.render(<App />);

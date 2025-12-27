import { createRoot, type Root } from "react-dom/client";
import { App } from "./components/App";
import "crumbs-design-system";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./pwa.js');
}

const container: HTMLElement = document.createElement("div");
document.body.appendChild(container);
const root: Root = createRoot(container);
root.render(<App />);

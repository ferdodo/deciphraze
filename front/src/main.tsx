import { createRoot, type Root } from "react-dom/client";
import { App } from "./components/App";
import "@deciphraze/ui/dist/ui.css";
import "./main.module.css";

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./pwa.js');
}

const container: HTMLElement = document.createElement("div");
document.body.appendChild(container);
const root: Root = createRoot(container);
root.render(<App />);
const loaderContainer: HTMLElement | null = document.getElementById("html-loader");

if (loaderContainer) {
    loaderContainer.style.opacity = "0";

    setTimeout(() => {
        loaderContainer.remove();
    }, 500);;
}
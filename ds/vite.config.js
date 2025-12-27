import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "@deciphraze/ds",
			fileName: () => "index.js",
            cssFileName: () => "index.css",
		},
	},
});
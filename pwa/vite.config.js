import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "@deciphraze/pwa",
			fileName: () => "index.js",
			formats: ["es"],
		},
	},
});


import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "./src/index.ts",
			name: "@deciphraze/ui",
			fileName: () => "index.js",
            cssFileName: () => "index.css",
			formats: ["es"],
		},
	},
});
#!/usr/bin/env zx
import shell from "shelljs";
import { runTask } from "zx-run-task";

const { find, cp, mkdir } = shell;

async function buildFrontend() {
	await runTask(
		"Bundle frontend",
		$`
		npx --no-install esbuild --bundle index.tsx \
			--jsx=automatic \
			--jsx-import-source=react \
			--target=chrome80 \
			--outfile=public/bundle.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`,
	);
}

async function test() {
	await runTask(
		"Bundle test",
		$`
		npx --no-install esbuild --bundle test.ts \
			--platform=node \
			--outfile=test.js \
			--minify \
			--tree-shaking=true \
			--sourcemap
	`,
	);

	await runTask("Test", $`node --enable-source-maps test.js`);
}

async function checkFrontendTypings() {
	await runTask("Checking frontend typings", $`npx tsc`);
}

await Promise.all([
	buildFrontend(),
	checkFrontendTypings(),
	// test()
]);

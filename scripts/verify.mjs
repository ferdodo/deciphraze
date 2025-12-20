#!/usr/bin/env zx

import task from "tasuku";
import { exec } from "node:child_process";
import { promisify } from "node:util";

async function run(command) {
	try {
		await promisify(exec)(command);
	} catch (error) {
		throw new Error(error);
	}
}

task("Type checking", async () => {
	await run("tsc --noEmit");
});

task("Linting", async () => {
	await run("biome ci ./src");
});

task("Validating file names", async () => {
	await run("exportcase check ./src");
});

task("Mutation testing", async () => {
	await run("node ./scripts/run-mutation.mjs");
});

task("Auditing", async () => {
	await run("npm audit --audit-level=critical");

	task("Checking non-killing tests", async () => {
		await run("node ./scripts/check-non-killing-tests.mjs");
	});
});
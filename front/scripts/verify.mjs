import task from "tasuku";
import { exec } from "node:child_process";
import { promisify } from "node:util";

function run(command) {
	return promisify(exec)(command).catch(error => {
		throw new Error(`\n\n${command}\n\n${error.stdout}\n\n${error.stderr}\n\n`);
	});
}

task.group(task => [
	task("type checking", async ({task}) => {
		await run("tsc --noEmit");

		await task("Testing", async ({task}) => {
			await run("vitest run");
	
			await task("Running mutation testing", async ({task}) => {
				await run("node ./scripts/run-mutation.mjs");
				await task("Checking non-killing tests", () => run("node ./scripts/check-non-killing-tests.mjs"));
			});
		})
	}),
	task("Linting", () => run("biome ci ./src")),
	task("Checking hooks complexity", () => run("biome ci --config-path=./biome.complexity.json ./src")),
	task("Validating file names", () => run("exportcase check ./src")),
	task("Auditing", () => run("npm audit --audit-level=critical")),
	task("Outdated dependencies", () => run("npm outdated")),
], {
	concurrency: 2,
	stopOnError: true,
});
import task from "tasuku";
import { exec } from "node:child_process";
import { promisify } from "node:util";

function run(command) {
	return promisify(exec)(command).catch(error => {
		throw new Error(`\n\n${command}\n\n${error.stdout}\n${error.stderr}\n\n`);
	});
}

task.group(task => [
    task("Type checking", async ({task}) => {
        await run("tsc --noEmit");

        await task("Testing", async ({task}) => {
            await run("npm run test");

            await task("Running mutation testing", async ({task}) => {
                await task("Coverage", () => run("npm run coverage"));
            });
        });
    }),
	task("Linting", () => run("npm run lint")),
	task("Outdated dependencies", () => run("npm outdated")),
	task("Auditing", () => run("npm audit --audit-level=low")),
], {
	concurrency: 2,
	stopOnError: true,
});
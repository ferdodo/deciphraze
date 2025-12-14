#!/usr/bin/env zx

import { runTask } from "zx-run-task";

await Promise.all([
	runTask("Type checking", $`tsc --noEmit`),
	runTask("Linting", $`biome ci ./src`),
	runTask("Validating file names", $`exportcase check ./src`),
	runTask("Mutation testing", $`node ./scripts/run-mutation.mjs`),
]);

await runTask("Checking non-killing tests", $`node ./scripts/check-non-killing-tests.mjs`);
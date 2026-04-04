import { createHash } from "node:crypto";
import { readFileSync, globSync } from "node:fs";
import { dirname } from "node:path";

function computeFileHash(filePath) {
	const content = readFileSync(filePath, 'utf8');
	return createHash('md5').update(content).digest('hex');
}

export function verifyImmutableFiles() {
	const checksumFiles = globSync('./src/**/*.immutable.md5');

	if (checksumFiles.length === 0) {
		console.log('No immutable files to verify');
		return;
	}

	const errors = [];

	for (const checksumFile of checksumFiles) {
		const originalFile = checksumFile.replace('.immutable.md5', '');
		const fileContent = readFileSync(checksumFile, 'utf8').trim();
		const storedChecksum = fileContent.split(/\s+/)[0];
		const currentChecksum = computeFileHash(originalFile);

		if (storedChecksum !== currentChecksum) {
			errors.push(`File ${originalFile} has been modified!\n  Expected: ${storedChecksum}\n  Got:      ${currentChecksum}`);
		}
	}

	if (errors.length > 0) {
		throw new Error(`\n\nImmutability check failed:\n\n${errors.join('\n\n')}\n\n`);
	}

	console.log(`✓ All ${checksumFiles.length} immutable file(s) verified successfully`);
	process.exit(0);
}

try {
	verifyImmutableFiles();
} catch (error) {
	console.error(error.message);
	process.exit(1);
}

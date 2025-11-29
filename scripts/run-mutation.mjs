import { execSync } from 'node:child_process';

async function getCurrentStagedFiles() {
	const result = execSync('git diff --cached --name-only', { stdio: 'pipe' });
	return result.toString().split('\n').filter(Boolean);
}

async function getUnstagedFiles() {
	const result = execSync('git diff --name-only', { stdio: 'pipe' });
	return result.toString().split('\n').filter(Boolean);
}

async function getModifiedFilesInLastCommit() {
	const result = execSync('git diff HEAD^ --name-only', { stdio: 'pipe' });
	return result.toString().split('\n').filter(Boolean);
}

async function getFilesToMutate() {
	return Promise.all(
		[getCurrentStagedFiles(), getUnstagedFiles(), getModifiedFilesInLastCommit()]
	).then(([stagedFiles, unstagedFiles, lastCommitFiles]) => {
		const modifiedFiles = new Set([...stagedFiles, ...unstagedFiles]);

		if (modifiedFiles.size === 0) {
			modifiedFiles.add(...lastCommitFiles);
		}

		return [...modifiedFiles].filter(v => v.endsWith('.ts') && !v.includes('test.ts'));
	});
}

async function runMutation() {
	const filesToMutate = await getFilesToMutate();

	if (filesToMutate.length === 0) {
		console.log('No files to mutate');
		return;
	}

	execSync(`npx stryker run --mutate ${filesToMutate.join(',')}`, { stdio: 'inherit' });
}

runMutation();
import type { ChallengeContextRepository } from "@deciphraze/core";
import type { ChallengeContext } from "@deciphraze/core";

const defaultChallengeContext = (): ChallengeContext => ({
	code: null,
});

export function createChallengeContextRepository(): ChallengeContextRepository {
	let context: ChallengeContext = defaultChallengeContext();
	const listeners: ((context: ChallengeContext) => void)[] = [];

	function getContext(): ChallengeContext {
		return { ...context };
	}

	function saveContext(newContext: ChallengeContext): void {
		context = { ...newContext };
		for (const listener of listeners) {
			listener({ ...context });
		}
	}

	function observeContext(listener: (context: ChallengeContext) => void): () => void {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	}

	return {
		getContext,
		saveContext,
		observeContext,
	};
}

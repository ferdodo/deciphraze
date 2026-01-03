import { createPwaService } from "./createPwaService";

// Instance singleton du service PWA
let pwaServiceInstance: ReturnType<typeof createPwaService> | null = null;

export function getPwaService(): ReturnType<typeof createPwaService> {
	if (!pwaServiceInstance) {
		pwaServiceInstance = createPwaService();
	}
	return pwaServiceInstance;
}


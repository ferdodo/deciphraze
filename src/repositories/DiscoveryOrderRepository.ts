import type { DiscoveryOrder } from "../types/DiscoveryOrder";

export interface DiscoveryOrderRepository {
	getDiscoveryOrder(date: string): DiscoveryOrder;
	setDiscoveryOrder(date: string, order: DiscoveryOrder): void;
	addLetterToDiscoveryOrder(date: string, letter: string): void;
}


import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";

export function createDiscoveryOrderRepositoryMock(): DiscoveryOrderRepository {
	const discoveryOrders: Record<string, DiscoveryOrder> = {};

	function getDiscoveryOrder(date: string): DiscoveryOrder {
		return discoveryOrders[date] || [];
	}

	function setDiscoveryOrder(date: string, order: DiscoveryOrder): void {
		discoveryOrders[date] = order;
	}

	function addLetterToDiscoveryOrder(date: string, letter: string): void {
		const currentOrder = getDiscoveryOrder(date);
		if (!currentOrder.includes(letter)) {
			discoveryOrders[date] = [...currentOrder, letter];
		}
	}

	return {
		getDiscoveryOrder,
		setDiscoveryOrder,
		addLetterToDiscoveryOrder
	};
}

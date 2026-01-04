import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

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

	function clear(): void {
		Object.keys(discoveryOrders).forEach(key => {
			delete discoveryOrders[key];
		});
	}

	return {
		getDiscoveryOrder,
		setDiscoveryOrder,
		addLetterToDiscoveryOrder,
		clear
	};
}

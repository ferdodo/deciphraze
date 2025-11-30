import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

const DISCOVERY_ORDER_STORAGE_KEY = "deciphraze_discovery_order";

export function createDiscoveryOrderRepository(): DiscoveryOrderRepository {
	function loadDiscoveryOrder(): Record<string, DiscoveryOrder> {
		try {
			const stored = localStorage.getItem(DISCOVERY_ORDER_STORAGE_KEY);
			return stored ? JSON.parse(stored) : {};
		} catch {
			return {};
		}
	}

	function saveDiscoveryOrder(discoveryOrder: Record<string, DiscoveryOrder>): void {
		try {
			localStorage.setItem(DISCOVERY_ORDER_STORAGE_KEY, JSON.stringify(discoveryOrder));
		} catch {
			// Ignore storage errors
		}
	}

	function getDiscoveryOrder(date: string): DiscoveryOrder {
		const allOrders = loadDiscoveryOrder();
		return allOrders[date] || [];
	}

	function setDiscoveryOrder(date: string, order: DiscoveryOrder): void {
		const allOrders = loadDiscoveryOrder();
		allOrders[date] = order;
		saveDiscoveryOrder(allOrders);
	}

	function addLetterToDiscoveryOrder(date: string, letter: string): void {
		const currentOrder = getDiscoveryOrder(date);
		if (!currentOrder.includes(letter)) {
			const newOrder = [...currentOrder, letter];
			setDiscoveryOrder(date, newOrder);
		}
	}

	return {
		getDiscoveryOrder,
		setDiscoveryOrder,
		addLetterToDiscoveryOrder
	};
}


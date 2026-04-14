import type { DiscoveryOrderRepository } from "../repositories/DiscoveryOrderRepository";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";
import type { StorageLike } from "./StorageLike";

const DISCOVERY_ORDER_STORAGE_KEY = "deciphraze_discovery_order";

export function createDiscoveryOrderRepository(storage: StorageLike): DiscoveryOrderRepository {
	function loadDiscoveryOrder(): Record<string, DiscoveryOrder> {
		try {
			const stored = storage.getItem(DISCOVERY_ORDER_STORAGE_KEY);
			if (!stored || stored === "null") {
				return {};
			}
			const parsed = JSON.parse(stored);
			return parsed && typeof parsed === "object" && parsed !== null ? parsed : {};
		} catch {
			return {};
		}
	}

	function saveDiscoveryOrder(discoveryOrder: Record<string, DiscoveryOrder>): void {
		try {
			storage.setItem(DISCOVERY_ORDER_STORAGE_KEY, JSON.stringify(discoveryOrder));
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
		addLetterToDiscoveryOrder,
	};
}

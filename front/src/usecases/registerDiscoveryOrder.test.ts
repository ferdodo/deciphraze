import { describe, it, expect } from "vitest";
import { withGameStarted } from "../fixtures/withGameStarted";
import { asPlayerAssociateOneBadLetter } from "../automations/asPlayerAssociateOneBadLetter";
import { asPlayerAssociateOneGoodLetter } from "../automations/asPlayerAssociateOneGoodLetter";
import { getCurrentDay } from "../utils/getCurrentDay";

describe("registerDiscoveryOrder", () => {
	it("should register discovery order when correct association is made", () => {
		const [cleanup, context] = withGameStarted();
		asPlayerAssociateOneGoodLetter(context);
		const today = getCurrentDay(context.timeService, context.forcedDayRepository);
		const discoveryOrder = context.discoveryOrderRepository.getDiscoveryOrder(today);
		expect(discoveryOrder.length).toBe(1);
		cleanup();
	});

	it("should not register discovery order when incorrect association is made", () => {
		const [cleanup, context] = withGameStarted();
		asPlayerAssociateOneBadLetter(context);
		const today = getCurrentDay(context.timeService, context.forcedDayRepository);
		const discoveryOrder = context.discoveryOrderRepository.getDiscoveryOrder(today);
		expect(discoveryOrder.length).toBe(0);
		cleanup();
	});
});

import { createTimeService } from "@deciphraze/browser";
import { createForcedDayRepository } from "../utils/createForcedDayRepository";
import { getCurrentDay } from "../utils/getCurrentDay";

export const defaultCurrentDay = getCurrentDay(createTimeService(), createForcedDayRepository());

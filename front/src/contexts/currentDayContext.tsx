import { createTimeService } from "@deciphraze/browser";
import { createContext, type Context } from "react";
import { createForcedDayRepository } from "../utils/createForcedDayRepository";
import { getCurrentDay } from "../utils/getCurrentDay";

const defaultCurrentDay = getCurrentDay(createTimeService(), createForcedDayRepository());

export const currentDayContext: Context<string> = createContext<string>(defaultCurrentDay);

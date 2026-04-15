import { createContext, type Context } from "react";
import { defaultCurrentDay } from "./defaultCurrentDay";

export const currentDayContext: Context<string> = createContext<string>(defaultCurrentDay);

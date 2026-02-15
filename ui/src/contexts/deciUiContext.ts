import { createContext } from "react";
import type { DeciUiContext } from "../types/DeciUiContext";
import type { Context } from "react";

export const deciUiContext: Context<DeciUiContext | undefined> = createContext<DeciUiContext | undefined>(undefined);


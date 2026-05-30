import { useContext } from "react";
import { currentDayContext } from "../contexts/currentDayContext";

export const useCurrentDay = (): string => {
	return useContext(currentDayContext);
};

import { createContext, type Context } from "react";
import { defaultCurrentDay } from "./defaultCurrentDay";
import { generateParagraph } from "../utils/generateParagraph";

const defaultParagraphOfTheDay = generateParagraph(defaultCurrentDay);

export const paragraphOfTheDayContext: Context<string> = createContext<string>(defaultParagraphOfTheDay);

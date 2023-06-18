import { normalizeWord } from "./normalizeWord";

export function isAlphabetic(character: string): boolean {
  const normalizedChar = normalizeWord(character);
  const uppercaseCharacter = normalizedChar.toUpperCase();
  const charCode = uppercaseCharacter.charCodeAt(0);  
  return charCode >= 65 && charCode <= 90;
}

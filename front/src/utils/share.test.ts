import { describe, it, expect } from "vitest";
import { share } from "./share";

describe("share", () => {
  it("should call navigator.clipboard.writeText", () => {
    // Mock navigator.clipboard
    let calledWith: string | undefined;
    const mockWriteText = (text: string): void => {
      calledWith = text;
    };
    
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: mockWriteText,
      },
      writable: true,
    });

    const matchCount = 5;
    share(matchCount);

    expect(calledWith).toBeDefined();
    expect(calledWith).toContain("Deciphraze");
  });

});

export type DecodedChallengeCode = 
	| { result: { level: number; realDay: string } }
	| { result: "error"; hint: string };


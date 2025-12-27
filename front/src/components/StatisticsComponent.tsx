import { DeciStats } from "@deciphraze/ds";
import { useStatistics } from "../hooks/useStatistics";
import { calculatePreferredLetters } from "../utils/calculatePreferredLetters";

export const StatisticsComponent = (): JSX.Element => {
	const statistics = useStatistics();
	const preferredLettersWithScore = calculatePreferredLetters(statistics.letterPositions, 10);
	
	// Convertir { letter, score } en { letter, count } pour DeciStats
	const preferredLetters = preferredLettersWithScore.map(({ letter, score }) => ({
		letter,
		count: score
	}));

	return <DeciStats statistics={statistics} preferredLetters={preferredLetters} />;
};


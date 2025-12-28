import { DeciStats, DeciPlusView } from "@deciphraze/ds";
import { useStatistics } from "../hooks/useStatistics";
import { calculatePreferredLetters } from "../utils/calculatePreferredLetters";

interface StatisticsComponentProps {
	onBack: () => void;
}

export const StatisticsComponent = ({ onBack }: StatisticsComponentProps): JSX.Element => {
	const statistics = useStatistics();
	const preferredLettersWithScore = calculatePreferredLetters(statistics.letterPositions, 10);
	
	// Convertir { letter, score } en { letter, count } pour DeciStats
	const preferredLetters = preferredLettersWithScore.map(({ letter, score }) => ({
		letter,
		count: score
	}));

	return (
		<DeciPlusView
			title="Statistiques"
			content={<DeciStats statistics={statistics} preferredLetters={preferredLetters} />}
			onBack={onBack}
		/>
	);
};


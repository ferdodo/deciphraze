import { DeciYesterdaySolution, DeciPlusView } from "@deciphraze/ds";
import { useParagraphOfYesterday } from "../hooks/useParagraphOfYesterday";

interface YesterdaySolutionComponentProps {
	onBack: () => void;
}

export function YesterdaySolutionComponent({ onBack }: YesterdaySolutionComponentProps): JSX.Element {
	const paragraphOfYesterday = useParagraphOfYesterday();
	return (
		<DeciPlusView
			title="Solution d'hier"
			content={<DeciYesterdaySolution paragraphOfYesterday={paragraphOfYesterday} />}
			onBack={onBack}
		/>
	);
}


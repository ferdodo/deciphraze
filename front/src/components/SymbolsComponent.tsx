import { useSymbolsRandomOrder } from "../hooks/useSymbolsRandomOrder";
import { SymbolComponent } from "./SymbolComponent";

export function SymbolsComponent(): JSX.Element {
	const alphabetRandom = useSymbolsRandomOrder();

	return (
		<>
			{alphabetRandom.map((l) => (
				<SymbolComponent key={l} character={l} />
			))}
		</>
	);
};


import { useEffect, useState } from "react";
import type { AssociationEntry } from "@deciphraze/core";
import { getDefaultStorage } from "../utils/getDefaultStorage";

const ASSOCIATION_HINT_SEEN_KEY = "deciphraze_association_hint_seen";

/**
 * Indication autour des commandes, affichée tant qu'aucune association n'a jamais été faite.
 */
export function useAssociationHint(associationHistory: AssociationEntry[]): boolean {
	const [alreadyAssociated, setAlreadyAssociated] = useState<boolean>(
		() => getDefaultStorage()?.getItem(ASSOCIATION_HINT_SEEN_KEY) === "true",
	);

	const hasAssociation = associationHistory.length > 0;

	useEffect(() => {
		if (hasAssociation && !alreadyAssociated) {
			getDefaultStorage()?.setItem(ASSOCIATION_HINT_SEEN_KEY, "true");
			setAlreadyAssociated(true);
		}
	}, [hasAssociation, alreadyAssociated]);

	return !alreadyAssociated && !hasAssociation;
}

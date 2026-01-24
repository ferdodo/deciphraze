import type React from "react";

interface DeciAchievementFooterProps {
	newAchievementIds: string[];
	onMarkAllAsViewed?: () => void;
}

export function DeciAchievementFooter({
	newAchievementIds,
	onMarkAllAsViewed,
}: DeciAchievementFooterProps): React.JSX.Element | null {
	if (newAchievementIds.length === 0 || !onMarkAllAsViewed) {
		return null;
	}

	return (
		<crumbs-button onClick={onMarkAllAsViewed} role="button">
			Marquer tous comme vus
		</crumbs-button>
	);
}

import type React from "react";
import styles from "./DeciStats.module.css";
import { DeciText } from "./DeciText";

const formatDate = (dateString: string | null): string => {
	if (!dateString) return "Aucune";
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
};

interface Statistics {
	totalGames: number;
	totalWordsFound: number;
	firstGameDate: string | null;
	lastGameDate: string | null;
	averageWordsPerGame: number;
	letterPositions: Array<Array<string>>;
	lastUpdated: string;
}

interface DeciStatsProps {
	statistics: Statistics;
	preferredLetters: Array<{ letter: string; count: number }>;
}

export function DeciStats({ statistics, preferredLetters }: DeciStatsProps): React.JSX.Element {

	return (
		<div className={styles.statisticsContainer}>
			<div className={styles.statisticsList}>
				{/* Nombre total de parties */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🎮</div>
					<div className={styles.statisticContent}>
						<DeciText variant="primary">Parties jouées</DeciText>
						<DeciText variant="muted">{statistics.totalGames}</DeciText>
					</div>
				</div>

				{/* Mots trouvés */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>📝</div>
					<div className={styles.statisticContent}>
						<DeciText variant="primary">Mots trouvés</DeciText>
						<DeciText variant="muted">{statistics.totalWordsFound}</DeciText>
					</div>
				</div>

				{/* Lettres préférées */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>⭐</div>
					<div className={styles.statisticContent}>
						<DeciText variant="primary">Lettres préférées</DeciText>
						<div className={styles.statisticValue}>
							{preferredLetters.length > 0 ? (
								preferredLetters.map((item, index) => (
									<DeciText key={item.letter} variant="muted">
										{item.letter}
										{index < preferredLetters.length - 1 ? ", " : ""}
									</DeciText>
								))
							) : (
								<DeciText variant="muted">Aucune statistique disponible</DeciText>
							)}
						</div>
					</div>
				</div>

				{/* Date de la première partie */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🌱</div>
					<div className={styles.statisticContent}>
						<DeciText variant="primary">Première partie</DeciText>
						<DeciText variant="muted">{formatDate(statistics.firstGameDate)}</DeciText>
					</div>
				</div>

				{/* Date de la dernière partie */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🕐</div>
					<div className={styles.statisticContent}>
						<DeciText variant="primary">Dernière partie</DeciText>
						<DeciText variant="muted">{formatDate(statistics.lastGameDate)}</DeciText>
					</div>
				</div>
			</div>
		</div>
	);
};


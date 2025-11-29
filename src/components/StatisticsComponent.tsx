import type React from "react";
import { useStatistics } from "../hooks/useStatistics";
import { calculatePreferredLetters } from "../utils/calculatePreferredLetters";
import styles from "./StatisticsComponent.module.css";

const formatDate = (dateString: string | null): string => {
	if (!dateString) return "Aucune";
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
};

export const StatisticsComponent: React.FC = () => {
	const statistics = useStatistics();
	const preferredLetters = calculatePreferredLetters(statistics.letterPositions, 10);

	return (
		<div className={styles.statisticsContainer}>
			<h3 className={styles.title}>📊 Statistiques</h3>
			<div className={styles.statisticsList}>
				{/* Nombre total de parties */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🎮</div>
					<div className={styles.statisticContent}>
						<div className={styles.statisticName}>Parties jouées</div>
						<div className={styles.statisticValue}>{statistics.totalGames}</div>
					</div>
				</div>

				{/* Mots trouvés */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>📝</div>
					<div className={styles.statisticContent}>
						<div className={styles.statisticName}>Mots trouvés</div>
						<div className={styles.statisticValue}>{statistics.totalWordsFound}</div>
					</div>
				</div>

				{/* Lettres préférées */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>⭐</div>
					<div className={styles.statisticContent}>
						<div className={styles.statisticName}>Lettres préférées</div>
						<div className={styles.statisticValue}>
							{preferredLetters.length > 0 ? (
								preferredLetters.map((item, index) => (
									<div key={item.letter} style={{ marginBottom: index < preferredLetters.length - 1 ? "0.5rem" : "0" }}>
										{item.letter} : {item.score.toFixed(1)}
									</div>
								))
							) : (
								<div>Aucune statistique disponible</div>
							)}
						</div>
					</div>
				</div>

				{/* Date de la première partie */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🎯</div>
					<div className={styles.statisticContent}>
						<div className={styles.statisticName}>Première partie</div>
						<div className={styles.statisticValue}>{formatDate(statistics.firstGameDate)}</div>
					</div>
				</div>

				{/* Date de la dernière partie */}
				<div className={styles.statistic}>
					<div className={styles.statisticIcon}>🕐</div>
					<div className={styles.statisticContent}>
						<div className={styles.statisticName}>Dernière partie</div>
						<div className={styles.statisticValue}>{formatDate(statistics.lastGameDate)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};


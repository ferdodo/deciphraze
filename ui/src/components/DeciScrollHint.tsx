import type React from "react";
import styles from "./DeciScrollHint.module.css";

interface DeciScrollHintProps {
	visible: boolean;
	/** Élément placé en fin de contenu défilant, observé pour savoir si la fin est visible. */
	endRef: React.RefObject<HTMLDivElement | null>;
	onClick: () => void;
}

/**
 * Chevron affiché en bas de la zone défilante.
 * À placer en dernier enfant du contenu défilant.
 */
export function DeciScrollHint({ visible, endRef, onClick }: DeciScrollHintProps): React.JSX.Element {
	return (
		<>
			{visible && (
				<div className={styles.anchor}>
					<button
						type="button"
						className={styles.button}
						onClick={onClick}
						aria-label="Faire défiler vers le bas"
						title="Faire défiler vers le bas"
					>
						<span className={styles.chevron}>&gt;</span>
					</button>
				</div>
			)}
			<div ref={endRef} className={styles.end} />
		</>
	);
}

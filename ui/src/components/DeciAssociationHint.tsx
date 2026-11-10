import type React from "react";
import styles from "./DeciAssociationHint.module.css";
import { DeciText } from "./DeciText";

interface DeciAssociationHintProps {
	visible: boolean;
	children: React.ReactNode;
}

/**
 * Entoure les commandes d'une bordure animée, avec un texte explicatif au-dessus.
 */
export function DeciAssociationHint({ visible, children }: DeciAssociationHintProps): React.JSX.Element {
	return (
		<>
			{visible && (
				<div className={styles.text}>
					<DeciText variant="primary">
						Sélectionnez une lettre puis un symbole pour les associer.
					</DeciText>
				</div>
			)}
			<div className={visible ? styles.frame : undefined}>
				{visible && (
					<svg className={styles.border} aria-hidden="true">
						<rect className={styles.rect} width="100%" height="100%" rx="8" ry="8" />
					</svg>
				)}
				{children}
			</div>
		</>
	);
}

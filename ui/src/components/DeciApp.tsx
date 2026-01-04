import type React from "react";
import styles from "./DeciApp.module.css";

interface DeciAppProps {
	children: React.ReactNode;
}

export function DeciApp({ children }: DeciAppProps): React.ReactNode {
	return (
		<div className={styles.app}>
			{children}
		</div>
	);
};


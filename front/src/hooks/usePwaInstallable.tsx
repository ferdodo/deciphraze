import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";

export function usePwaInstallable(): boolean {
	const { pwaService } = useGameContext();
	const [isInstallable, setIsInstallable] = useState(false);

	useEffect(() => {
		const unsubscribe = pwaService.observePwaInstallable((isInstallable) => {
			setIsInstallable(isInstallable);
		});

		return unsubscribe;
	}, [pwaService]);

	return isInstallable;
}


import { useEffect, useState } from "react";
import { useGameContext } from "./useGameContext";

export function usePwaInstallable(): boolean {
	const { browserService } = useGameContext();
	const [isInstallable, setIsInstallable] = useState(browserService.isPwaInstallable());

	useEffect(() => {
		const unsubscribe = browserService.observePwaInstallable((isInstallable) => {
			setIsInstallable(isInstallable);
		});

		return unsubscribe;
	}, [browserService]);

	return isInstallable;
}


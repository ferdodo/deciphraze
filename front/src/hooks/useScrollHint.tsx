import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
import { getDefaultStorage } from "../utils/getDefaultStorage";

const SCROLL_HINT_SEEN_KEY = "deciphraze_scroll_hint_seen";

interface ScrollHint {
	scrollHintVisible: boolean;
	scrollHintEndRef: React.RefObject<HTMLDivElement | null>;
	onScrollHintClick: () => void;
}

/**
 * Indication de scroll affichée la première fois, tant que la fin de la zone de jeu n'est pas visible.
 */
export function useScrollHint(): ScrollHint {
	const scrollHintEndRef = useRef<HTMLDivElement>(null);
	const [alreadySeen, setAlreadySeen] = useState<boolean>(
		() => getDefaultStorage()?.getItem(SCROLL_HINT_SEEN_KEY) === "true",
	);
	const [endVisible, setEndVisible] = useState<boolean>(true);

	useEffect(() => {
		const end = scrollHintEndRef.current;

		if (alreadySeen || !end || typeof IntersectionObserver === "undefined") {
			return;
		}

		let hasBeenShown = false;

		const observer = new IntersectionObserver(([entry]) => {
			if (!entry) {
				return;
			}

			setEndVisible(entry.isIntersecting);

			if (!entry.isIntersecting) {
				hasBeenShown = true;
			} else if (hasBeenShown) {
				getDefaultStorage()?.setItem(SCROLL_HINT_SEEN_KEY, "true");
				setAlreadySeen(true);
			}
		});

		observer.observe(end);
		return () => observer.disconnect();
	}, [alreadySeen]);

	const onScrollHintClick = useCallback((): void => {
		scrollHintEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	}, []);

	return {
		scrollHintVisible: !alreadySeen && !endVisible,
		scrollHintEndRef,
		onScrollHintClick,
	};
}

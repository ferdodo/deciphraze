import { useState, useEffect } from "react";
import { DeciChallengeMenu, DeciPlusView } from "@deciphraze/ui";
import { useGameContext } from "../hooks/useGameContext";
import { useRealTodayDate } from "../hooks/useRealTodayDate";
import { useIsTodayGameCompleted } from "../hooks/useIsTodayGameCompleted";
import { useChallengeContext } from "../hooks/useChallengeContext";
import { getChallengeWordForLevelAndDay, displayChallengeCode } from "@deciphraze/core";
import { getLetterUnlockPercentage } from "../utils/getLetterUnlockPercentage";
import { getLetterIndexFromCodeDay } from "../utils/getLetterIndexFromCodeDay";
import { getCodesRequiredPerLetter } from "../utils/getCodesRequiredPerLetter";
import { unlockChallengeLetter } from "../usecases/unlockChallengeLetter";
import { unlockChallenge } from "../usecases/unlockChallenge";
import type React from "react";

interface ChallengeMenuComponentProps {
	isPlatinumEarned: boolean;
	onBack: () => void;
}

export function ChallengeMenuComponent({
	isPlatinumEarned,
	onBack,
}: ChallengeMenuComponentProps): React.JSX.Element {
	const gameContext = useGameContext();
	const { challengeRepository, challengeCodesRepository } = gameContext;
	const realTodayDate = useRealTodayDate();
	const isTodayGameCompleted = useIsTodayGameCompleted();
	const challengeContext = useChallengeContext();

	const [codeInput, setCodeInput] = useState("");
	const [wordInput, setWordInput] = useState("");
	const [challenge, setChallenge] = useState(
		challengeRepository.getChallenge(),
	);
	const [codes, setCodes] = useState(challengeCodesRepository.getCodes());

	// Subscribe to changes
	useEffect(() => {
		const unsubscribeChallenge = challengeRepository.observeChallenge(
			(newChallenge) => {
				setChallenge(newChallenge);
			},
		);

		const unsubscribeCodes = challengeCodesRepository.observeCodes(
			(newCodes) => {
				setCodes(newCodes);
			},
		);

		return () => {
			unsubscribeChallenge();
			unsubscribeCodes();
		};
	}, [challengeRepository, challengeCodesRepository]);

	const word = getChallengeWordForLevelAndDay(challenge.level, realTodayDate, gameContext.randomService);

	// Calculate percentages for each of the 7 letters
	const letterPercentages = Array.from({ length: 7 }, (_, index) => {
		return getLetterUnlockPercentage(challenge.id, codes, realTodayDate, challenge.level, index, gameContext.randomService);
	});

	// Check if today's letter is already unlocked
	const todayLetterIndex = getLetterIndexFromCodeDay(realTodayDate);
	const isTodayLetterUnlocked = letterPercentages[todayLetterIndex] === 100;

	const handleShowCode = (): void => {
		const code = displayChallengeCode(gameContext);
		setCodeInput(code || codeInput);
	};

	const handleUnlockLetter = (): void => {
		unlockChallengeLetter(codeInput, gameContext);
		setCodeInput("");
	};

	const handleSubmitWord = (): void => {
		unlockChallenge(wordInput, gameContext);
		setWordInput("");
	};

	return (
		<DeciPlusView
			title="Challenge"
			content={
				<DeciChallengeMenu
					levelBadge={challenge.level}
					letter1Percentage={letterPercentages[0]}
					letter2Percentage={letterPercentages[1]}
					letter3Percentage={letterPercentages[2]}
					letter4Percentage={letterPercentages[3]}
					letter5Percentage={letterPercentages[4]}
					letter6Percentage={letterPercentages[5]}
					letter7Percentage={letterPercentages[6]}
					isLocked={!isPlatinumEarned}
					codeInput={codeInput}
					onCodeInputChange={setCodeInput}
					onShowCode={handleShowCode}
					displayedCode={challengeContext.code}
					onUnlockLetter={handleUnlockLetter}
					isTodayLetterUnlocked={isTodayLetterUnlocked}
					wordInput={wordInput}
					onWordInputChange={setWordInput}
					onSubmitWord={handleSubmitWord}
					codesRequiredPerLetter={getCodesRequiredPerLetter(challenge.level)}
					word={word}
					isTodayGameCompleted={isTodayGameCompleted}
				/>
			}
			onBack={onBack}
		/>
	);
}

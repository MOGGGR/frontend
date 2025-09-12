import { useState, useCallback, useEffect } from "react";

import Grid from "@components/Wordle";
import Keyboard from "@components/Wordle/Keyboard";
import GameHeader from "@components/common/GameHeader";

import { LetterStatusEnum } from "../../constants/wordleConstants";
import FinishModal from "@components/common/FinishModal";
import Help from "@components/Wordle/Help";
import words from "./words";

import styles from "./style.module.css"

const CONFIG = {
	MAX_ATTEMPTS: 6,
	WORD_LENGTH: 5,
	SECRET_WORD: "LIVRO"
};

const getDefaultGuess = () => new Array(CONFIG.WORD_LENGTH).fill({ char: "" });

const filledCharacterCount = (guess) => guess.reduce((count, item) => (item.char === "" ? count - 1 : count), CONFIG.WORD_LENGTH);

const addGuessCharacter = (guess, char, index) => {
	return guess.map((item, i) => (i === index ? { ...item, char } : item));
};

const removeGuessCharacter = (guess, index) => {
	return guess.map((item, i) => (i === index ? { ...item, char: "" } : item));
};

function selectCorrectWord() {
  const i = Math.floor(Math.random() * words.length);
  return words[i];
}


export default function Wordle() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [guesses, setGuesses] = useState([]);
	const [currentGuess, setCurrentGuess] = useState(getDefaultGuess());
	const [isGameOver, setIsGameOver] = useState(false);
	const [isHelpOpen, setIsHelpOpen] = useState(false);
	const [correctWord, setCorrectWord] = useState("");
	const [playerWin, setPlayerWin] = useState(false);

	const checkWord = (word) => {
		let result = [];
		const correctArr = correctWord.split("");

		for (let i = 0; i < word.length; i++) {
			const char = word[i];
			if (char === correctArr[i]) {
				result.push({ char, status: LetterStatusEnum.CORRECT });
			} else if (correctArr.includes(char)) {
				result.push({ char, status: LetterStatusEnum.INCORRECT_POSITION });
			} else {
				result.push({ char, status: LetterStatusEnum.DONT_EXIST });
			}
		}
		return result;
	};

	useEffect(() => {
		setCorrectWord(selectCorrectWord())
	}, [isGameOver]);

	const handleKeyPress = useCallback(
		async (key) => {
			if (isGameOver) return;

			const normalizedKey = key.toUpperCase();

			if (normalizedKey === "ENTER") {
				if (filledCharacterCount(currentGuess) === CONFIG.WORD_LENGTH) {
					const fullWord = currentGuess.reduce((word, item) => word + item.char, "");

					const guessResult = checkWord(fullWord);

					const newGuesses = [...guesses, guessResult];
					setGuesses(newGuesses);
					setCurrentGuess(getDefaultGuess());
					setActiveIndex((0));

					const playerWon = guessResult.every((letter) => letter.status === LetterStatusEnum.CORRECT);
					const maxAttemptsReached = newGuesses.length >= CONFIG.MAX_ATTEMPTS;

					if (playerWon) {
						setPlayerWin(true)
						setIsGameOver(true);
					}

					if (maxAttemptsReached) {
						setPlayerWin(false)
						setIsGameOver(true);
					}
				}
			} else if (normalizedKey === "BACKSPACE") {
				setCurrentGuess((prev) => removeGuessCharacter(prev, activeIndex));
				setActiveIndex((prev) => Math.max(prev - 1, 0));
			} else if (/^[A-Z]$/.test(normalizedKey)) {
				setCurrentGuess((prev) => addGuessCharacter(prev, normalizedKey, activeIndex));
				setActiveIndex((prev) => Math.min(prev + 1, CONFIG.WORD_LENGTH - 1));
			}
		},
		[currentGuess, guesses, isGameOver, activeIndex]
	);

	const getColor = (status) => {
		if (status === LetterStatusEnum.CORRECT) return "green";
		if (status === LetterStatusEnum.INCORRECT_POSITION) return "goldenrod";
		if (status === LetterStatusEnum.DONT_EXIST) return "gray";
		return "absent";
	};

	return (
		<div className={styles["container"]}>
			<GameHeader isHelpOpen={isHelpOpen} setIsHelpOpen={setIsHelpOpen} ContentHelp={Help} />
			<Grid
				guesses={guesses}
				isGameOver={isGameOver}
				currentGuess={currentGuess}
				getLetterColor={getColor}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>
			<Keyboard onKeyPress={handleKeyPress} guesses={guesses} getLetterColor={getColor} />
			<FinishModal showModal={isGameOver} correctWord={correctWord} playerWin={playerWin} />
		</div>
	);
}

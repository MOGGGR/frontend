import React from "react";

import Button from "./Button";

import styles from "./styles.module.css";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

function Grid({ guesses, currentGuess, getLetterColor, isGameOver, activeIndex, setActiveIndex }) {
	return (
		<div className={styles.grid}>
			<span className={styles.label}>Descubra a palavra!</span>

			{Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => {
				const isActiveRow = !isGameOver && rowIndex === guesses.length;
				const guess =
					guesses[rowIndex] ||
					(isActiveRow ? currentGuess : new Array(WORD_LENGTH).fill({ char: "" }));

				return (
					<div
						key={`row-${rowIndex}`}
						className={`${styles.row} ${isActiveRow ? styles.activeRow : ""}`}
					>
						{guess.map(({ char, status }, colIndex) => {
							const color = rowIndex < guesses.length ? getLetterColor(status) : "";
							const isActiveCell = isActiveRow && activeIndex === colIndex;

							return (
								<div
									key={`${rowIndex}-${colIndex}`}
									onClick={() => {
										if (isActiveRow) {
											setActiveIndex(colIndex);
										}
									}}
									style={{
										cursor: isActiveRow ? "pointer" : "default",
										position: "relative",
									}}
								>
									<Button letter={char} color={color} isActive={isActiveCell} />
								</div>
							);
						})}
					</div>
				);
			})}
		</div>
	);
}

export default Grid;

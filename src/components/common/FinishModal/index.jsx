import React, { useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

import styles from "./styles.module.css";
import confetti from "canvas-confetti";

function FinishModal({ showModal, correctWord, playerWin }) {
	const navigate = useNavigate();

	const modalClasses = classNames(styles["all"], {
		[styles["show"]]: showModal
	});

	useEffect(() => {
		if (showModal) {
			confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
		}
	}, [showModal])

	const headerText = playerWin ? "Você conseguiu!" : "Não foi dessa vez :(";
	const mainTitle = playerWin ? "Parabéns" : "Tente novamente!";
	const mainText = playerWin ? (
		<>
			Você acertou, a palavra era:{" "}
			<span className={styles["highlight"]}>{correctWord}</span>
			{" "}vamos jogar de novo?
		</>
	) : (
		<>
			Você não conseguiu descobrir a palavra, ela era:{" "}
			<span className={styles["highlight"]}>{correctWord}</span>
			{", tente mais uma vez!"}
		</>
	);

	return (
		<div className={modalClasses}>
			<div className={styles["content"]}></div>
			<div className={styles["modal"]}>
				<div className={styles["header"]}>
					<h2>{headerText}</h2>
				</div>
				<span className={styles["messageHeader"]}>
					{mainTitle}
				</span>
				<span className={styles["message"]}>
					{mainText}
				</span>
				<div className={styles["buttons"]}>
					<Button
						customStyle={{ width: "100%" }}
						text="Jogar novamente"
						size="medium"
						type="primary"
						onClick={() => window.location.reload()}
					/>
				</div>
			</div>
		</div>
	);
}

export default FinishModal;

import React, { useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

import styles from "./styles.module.css";
import confetti from "canvas-confetti";

function FinishModal({ time, showModal }) {
	const navigate = useNavigate();

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const modalClasses = classNames(styles["all"], {
		[styles["show"]]: showModal
	});

	useEffect(() => {
		if(showModal) {
			confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
		}
	}, [showModal])

	return (
		<div className={modalClasses}>
			<div className={styles["content"]}></div>
			<div className={styles["modal"]}>
				<div className={styles["header"]}>
					<h2>Task Finalizada!</h2>
				</div>
				<span className={styles["messageHeader"]}>
					Parabéns!
				</span>
				<span className={styles["message"]}>
					Você completou sua tarefa, onde você irá em sua jornada expert agora?
				</span>
				<div className={styles["buttons"]}>
					<Button
						customStyle={{ height: "100%", aspectRatio: "1/1" }}
						size="medium"
						icon="bx-home"
						type="primary"
						onClick={() => navigate("/map")}
					/>
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

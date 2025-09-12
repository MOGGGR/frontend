import React from "react";

import Modal from "@components/Home/Modal";
import Button from "../Button";

import style from "./style.module.css";

export default function GameHeader({task, ContentHelp, isHelpOpen, setIsHelpOpen}) {
	return (
		<div className={style.header}>
			<Button onClick={() => { setIsHelpOpen(true) }} type="primary" size="small" icon="bx-question-mark" />

			<Modal onClose={() => setIsHelpOpen(false)} show={isHelpOpen} title="Ajuda">
				<div className={style.modalContent}>
					<ContentHelp />
				</div>
			</Modal>
		</div>
	);
}

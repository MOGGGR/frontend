import React from "react";

import styles from "./style.module.css";

function DialogueBox({text}) {
	return (
		<div className={styles["dialogueWrapper"]} key={text}>
			<div className={styles["dialogueBox"]}>
				<p className={styles["dialogueText"]}>{text}</p>
			</div>
			<div className={styles["dialogueLabelWrapper"]}>
				<div className={styles["dialogueLabel"]}>
					<p className={styles["dialogueLabelText"]}>Scrum Master</p>
				</div>
                <div className={styles["dialogueLabelShadow"]}>
					
				</div>
			</div>
		</div>
	);
}

export default DialogueBox;

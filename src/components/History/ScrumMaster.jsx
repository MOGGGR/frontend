import {useEffect, useState} from "react";
import styles from "./style.module.css";

function ScrumMaster({scrumExpr, pos}) {
	if (scrumExpr === 0) return null;

	return (
		<img
			key={pos}
			src={`../../../src/assets/scrum_expressions/Scrum-${scrumExpr}.png`}
			alt="scrum-master"
			className={styles["scrumMaster"]}
		/>
	);
}

export default ScrumMaster;

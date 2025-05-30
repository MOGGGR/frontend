import {useEffect, useState} from "react";
import styles from "./style.module.css";

function ModularBackGround({backGround}) {
	if (backGround === 0) return null;

	return (
		<img
			key={backGround}
			src={`../../../src/assets/backgrounds/BG-${backGround}.png`}
			alt="Imagem de fundo"
			className={styles["backGround"]}
		/>
	);
}

export default ModularBackGround;

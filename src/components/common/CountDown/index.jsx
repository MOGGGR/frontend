import { useEffect, useState } from "react";
import styles from "./style.module.css";

function CountDown({ onComplete }) {
	const [count, setCount] = useState(3);

	useEffect(() => {
		if (count === 0) {
			const timeout = setTimeout(() => {
				onComplete();
			}, 1000);
			return () => clearTimeout(timeout);
		}

		const timer = setTimeout(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		return () => clearTimeout(timer);
	}, [count, onComplete]);

	return (
		<div className={styles["overlay"]}>
			<img
				src={"../../../src/assets/wallpaper-mobile.png"}
				alt="background"
				className={styles["backgroundImage"]}
			/>
			<div className={styles["number"]} key={count}>{count === 0 ? "GO!" : count}</div>
		</div>
	);
}

export default CountDown;

import React, {useEffect, useRef} from "react";

import styles from "./style.module.css";

function Column({title, children, length}) {
	const listRef = useRef(null);

	useEffect(() => {
		const el = listRef.current;
		if (el && title == "To-do") {
			el.scrollTop = el.scrollHeight;
		}
	}, []);

	return (
		<div className={styles["column"]}>
			<span className={styles["title"]}>
				{length} {title}
			</span>
			<div className={styles["cards"]} ref={listRef}>
				{children}
			</div>
		</div>
	);
}

export default Column;

import React from "react";
import { useAuthStore } from "@stores/useAuth";
import Ticket from "../../../assets/Vector.svg";

import style from "./style.module.css";

function GameHeader({ task, timer }) {
	const getUserData = useAuthStore((state) => state.getUserData)
	const userData = getUserData();

	const formatTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	return (
		<div className={style["header"]}>
			<div>
				<img className={style["icon"]} src={Ticket} />
				<span>{userData.tickets}</span>
			</div>
			<span className={style["task"]}>{task}</span>
			<span>{formatTime(timer)}</span>
		</div>
	);
}

export default GameHeader;

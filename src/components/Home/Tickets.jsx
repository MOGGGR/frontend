import React from "react";

import { useAuthStore } from "@stores/useAuth";
import Ticket from "../../assets/Vector.svg";

import styles from "./style.module.css";

function Tickets() {
	const getUserData = useAuthStore((state) => state.getUserData)
	const userData = getUserData();

	return (
		<div className={styles["tickets"]}>
			<span>saldo atual:</span>
			<div className={styles["tickets-length"]}>
				<img className={styles["icon"]} src={Ticket} />
				<span>{userData.tickets}</span>
				<span> Tickets</span>
			</div>
		</div>
	);
}

export default Tickets;

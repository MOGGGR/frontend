import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import About from "@components/Home/About";
import Button from "@components/common/Button";
import Modal from "@components/Home/Modal";
import Prizes from "@components/Home/Prizes";
import Tickets from "@components/Home/Tickets";
import SoftExtendedLogo from "../../assets/SoftExtendedLogo.png";
import GameLogo from "../../assets/GameLogo.svg";
import { useAuthStore } from "@stores/useAuth";

import styles from "./style.module.css";

function Home() {
	const navigate = useNavigate();
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isPrizesModalOpen, setIsPrizesModalOpen] = useState(false);
	const getToken = useAuthStore((state) => state.token);
	const getUserData = useAuthStore((state) => state.getUserData)
	const userData = getUserData();

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			{userData?.tickets > 0 &&  <Tickets />}
			<img className={styles["logo-game"]} src={GameLogo} alt="Logo do game" />
			<div className={styles["buttons"]}>
	{/* 			{level == 4 && (
					<div className={styles["buttons-left"]}>
						<Button type="primary" size="medium" icon="bxs-quote-alt-left" onClick={() => navigate("/phrase")} />
					</div>
				)} */}
				<Button
					type="primary"
					size="large"
					icon="bx-play"
					onClick={() => (getToken === null ? navigate("/register") : navigate("/map"))}
				/>
				<div className={styles["buttons-right"]}>
					<Button type="primary" size="medium" icon="bx-trophy" onClick={() => setIsPrizesModalOpen(true)} />
					<Button type="primary" size="medium" icon="bx-help-circle" onClick={() => setIsAboutModalOpen(true)} />
				</div>
			</div>
			<Modal title="Sobre" show={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>
				<About />
			</Modal>
			<Modal title="Prêmios" show={isPrizesModalOpen} onClose={() => setIsPrizesModalOpen(false)}>
				<Prizes />
			</Modal>
		</div>
	);
}

export default Home;

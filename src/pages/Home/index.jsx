import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import About from "@components/Home/About";
import Button from "@components/common/Button";
import Modal from "@components/Home/Modal";
import Prizes from "@components/Home/Prizes";
/* import Tickets from "@components/Home/Tickets"; */
import {useUser} from "@helpers/context/UserContext";
import { useAuthStore } from "@stores/useAuth";

import styles from "./style.module.css";

function Home() {
	const {level} = useUser();
	const navigate = useNavigate();
	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [isPrizesModalOpen, setIsPrizesModalOpen] = useState(false);
	const getToken = useAuthStore((state) => state.token);

	const handleNavigation = () => {
		if (getToken === null) return navigate("/register");
		if (level === 0) return navigate("/history");
		return navigate("/map");
	};

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />
			{/* <Tickets /> */}
			<img className={styles["logo-game"]} src="../../../src/assets/GameLogo.svg" alt="Logo do game" />
			<div className={styles["buttons"]}>
				{level == 4 && (
					<div className={styles["buttons-left"]}>
						<Button type="primary" size="medium" icon="bxs-quote-alt-left" onClick={() => navigate("/phrase")} />
					</div>
				)}
				<Button
					type="primary"
					size="large"
					icon="bx-play"
					onClick={handleNavigation}
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

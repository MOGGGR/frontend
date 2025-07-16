import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import { useAuthStore } from "@stores/useAuth";
import Button from "@components/common/Button";
import { createAuthController } from "@controllers/auth";
import SoftExtendedLogo from "../../../assets/SoftExtendedLogo.png";

import styles from "../style.module.css";

function ConfirmEmail() {
	const navigate = useNavigate();
	const { confirmEmail, resendCode } = createAuthController();
	const userData = useAuthStore((state) => state.userData)

	const [code, setCode] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("confirmar");
	const [resendTimer, setResendTimer] = useState(0);

	const handleCodeChange = (e) => {
		setCode(e.target.value);
		setButtonLabel("confirmar");
		setWasSubmitted(false);
	};

	const handleCodeSubmit = async () => {
		const response = await confirmEmail({ code });

		if (response) {
			setIsCorrect(true);
			setButtonLabel(":)");
			confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
		} else {
			setButtonLabel(":(");
		}
		setWasSubmitted(true);
	};

	const handleResendCode = () => {
		if (resendTimer === 0) {
			resendCode();
			setResendTimer(20);
		}
	};

	const getButtonStyle = () => {
		if (!wasSubmitted) return {};
		return isCorrect
			? { backgroundImage: "linear-gradient(to top, #00E883 0%, #009182 100%)" }
			: { backgroundImage: "linear-gradient(to top, #FF7D7E 0%, #B40048 100%)" };
	};

	useEffect(() => {
		let timer;
		if (resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [resendTimer]);

	return (
		<div className={styles["container"]}>
			<img className={styles["logo"]} src={SoftExtendedLogo} alt="Logo da Softexpert" />
			<div className={styles["content"]}>
				<div>
					<Input
						label="Código de verificação"
						value={code}
						type="number"
						showButton={false}
						inputMode="numeric"
						isValid={wasSubmitted ? isCorrect : null}
						onChange={handleCodeChange}
						error={wasSubmitted && !isCorrect ? "Código inválido" : null}
						disabled={isCorrect}
					/>
					<span className={styles["help-text"]}>Enviado para {userData.email}. <span>Verifique o Spam</span></span>
				</div>
				<div className={styles["buttons"]}>
					<Button
					isDisabled={code.length < 4 || isCorrect}
					type="primary"
					size="small"
					text={buttonLabel}
					customStyle={getButtonStyle()}
					onClick={handleCodeSubmit}
					/>
					<Button
						isDisabled={resendTimer > 0 || isCorrect}
						type="primary"
						size="small"
						text={resendTimer > 0 ? `Reenviar (${resendTimer}s)` : "Reenviar código"}
						customStyle={{ width: "100%", marginTop: "0.5rem" }}
						onClick={handleResendCode}
					/>
				</div>
			</div>
			<div>
				{isCorrect && (
					<Button
						type="primary"
						size="small"
						text="Partiu jogar"
						customStyle={{ marginTop: "1rem", width: "100%" }}
						onClick={() => navigate("/map")}
					/>
				)}
			</div>
		</div>
	);
}

export default ConfirmEmail;

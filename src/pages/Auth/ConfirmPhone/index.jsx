import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import confetti from "canvas-confetti";

import Input from "@components/common/Input";
import {useAuthStore} from "@stores/useAuth";
import Button from "@components/common/Button";
import {createAuthController} from "@controllers/auth";
import SoftExtendedLogo from "../../../assets/SoftExtendedLogo.png";
import {formatPhone, unformatPhone, validateEmail, validatePhone} from "@components/common/Input/validTypes";

import styles from "../style.module.css";

function ConfirmEmail() {
	const navigate = useNavigate();
	const {insertEmail, confirmEmail, resendCode} = createAuthController();

	const [step, setStep] = useState("email");
	const [email, setEmail] = useState("");
	const [code, setCode] = useState("");
	const [wasSubmitted, setWasSubmitted] = useState(false);
	const [showError, setShowError] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);
	const [buttonLabel, setButtonLabel] = useState("confirmar");
	const [resendTimer, setResendTimer] = useState(0);

	const userData = useAuthStore((state) => state.userData);

	const handleEmailChange = (e) => {
		setEmail(e);
	};

	const handleEmailSubmit = async () => {
		if (validateEmail(email)) {

			const response = await insertEmail({email: email});

			if (response) {
				setStep("code");
				setResendTimer(20);
			}
		}
	};

	const handleCodeChange = (e) => {
		setCode(e.target.value);
		setShowError(false);
		setButtonLabel("confirmar");
		setWasSubmitted(false);
	};

	const handleCodeSubmit = async () => {
		setWasSubmitted(true);
		const response = await confirmEmail({code});
		if (response) {
			setIsCorrect(true);
			setButtonLabel(":)");
			confetti({particleCount: 120, spread: 70, origin: {y: 0.6}});
		} else {
			setButtonLabel(":(");
			setShowError(true);
		}
	};

	const handleResendCode = () => {
		if (resendTimer === 0) {
			resendCode();
			setResendTimer(20);
		}
	};

	useEffect(() => {
		let timer;
		if (resendTimer > 0) {
			timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
		}
		return () => clearTimeout(timer);
	}, [resendTimer]);

	useEffect(() => {
		if (userData.fgEmailVerified === 1) {
			setStep("email");
		} else if (userData.fgEmailVerified === 2) {
			setStep("code");
		}
	}, [userData]);

	return (
		<div className={styles["container"]}>
			<img className={styles["logo"]} src={SoftExtendedLogo} alt="Logo da Softexpert" />
			<div className={styles["content"]}>
				{step === "email" && (
					<>
						<Input label="Email" value={email} type="email" onChange={handleEmailChange} placeholder="fulano@algo.com" />
						<Button
							isDisabled={!validateEmail(email)}
							type="primary"
							size="small"
							customStyle={{width: "100%"}}
							text="Enviar código"
							onClick={handleEmailSubmit}
						/>
					</>
				)}

				{step === "code" && (
					<>
						<div>
							<Input
								label="Código de verificação"
								value={code}
								type="number"
								inputMode="numeric"
								isValid={wasSubmitted ? !showError : null}
								onChange={handleCodeChange}
								disabled={isCorrect}
							/>
							<span className={styles["help-text"]}>Enviado para o email: { email }</span>
						</div>
						<Button
							isDisabled={code.length < 4 || isCorrect}
							type="primary"
							size="small"
							text={buttonLabel}
							customStyle={
								wasSubmitted
									? isCorrect
										? {backgroundImage: "linear-gradient(to top, #00E883 0%, #009182 100%)", width: "100%"}
										: {backgroundImage: "linear-gradient(to top, #FF7D7E 0%, #B40048 100%)", width: "100%"}
									: {width: "100%"}
							}
							onClick={handleCodeSubmit}
						/>

						<Button
							isDisabled={resendTimer > 0 || isCorrect}
							type="primary"
							size="small"
							text={resendTimer > 0 ? `Reenviar (${resendTimer}s)` : "Reenviar código"}
							customStyle={{width: "100%", marginTop: "0.5rem"}}
							onClick={handleResendCode}
						/>
					</>
				)}
			</div>
			<div>{isCorrect && <Button type="primary" size="small" text="Partiu jogar" onClick={() => navigate("/map")} />}</div>
		</div>
	);
}

export default ConfirmEmail;

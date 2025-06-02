import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {createAuthController} from "@controllers/auth";
import {validateEmail, validatePassword} from "@components/common/Input/validTypes";
import SoftExtendedLogo from "../../../assets/SoftExtendedLogo.png";

import styles from "../style.module.css";

const initialInputs = [
	{id: "firstName", label: "Nome", isRequired: true, type: "text", value: ""},
	{id: "lastName", label: "Sobrenome", isRequired: true, type: "text", value: ""},
	{id: "email", label: "E-mail", isRequired: true, type: "email", value: ""},
	{id: "password", label: "Senha", isRequired: true, type: "password", value: ""},
	{id: "confPass", label: "Confirmar Senha", isRequired: true, type: "password", value: ""}
];

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState(initialInputs);

	const {register} = createAuthController();

	const handleInputChange = (e) => {
		const {id, value} = e.target;
		const updatedInputs = inputs.map((input) => {
			if (input.id === id) {
				let error = "";

				if (value.length > 0) {
					if (id === "email" && !validateEmail(value)) {
						error = "E-mail inválido";
					} else if (id === "password" && !validatePassword(value)) {
						error = "A senha deve ter pelo menos 8 dígitos, letras, números e um caracter especial!";
					} else if (id === "confPass" && value !== inputs.find((i) => i.id === "password").value) {
						error = "Senhas não coincidem";
					}
				}

				return {...input, value, error};
			}
			return input;
		});

		const password = updatedInputs.find((i) => i.id === "password");
		const confPass = updatedInputs.find((i) => i.id === "confPass");
		if (confPass && password && confPass.value !== password.value) {
			confPass.error = "Senhas não coincidem";
		} else if (confPass) {
			confPass.error = "";
		}

		setInputs(updatedInputs);
	};

	const canSubmit = inputs.every((i) => i.value && !i.error);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {};
		inputs.forEach(({id, value}) => {
			if (id !== "confPass") {
				userData[id] = value;
			}
		});

		const response = await register(userData);

		if (response) {
			navigate("/confirm-email");
		}
	};

	return (
		<div className={styles["container"]}>
			<img className={styles.logo} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles["fields"]}>
					{inputs.map(({id, label, type, value, error, isRequired}) => (
						<Input
							key={id}
							id={id}
							type={type}
							label={label}
							isRequired={isRequired}
							value={value}
							error={error}
							onChange={handleInputChange}
						/>
					))}
				</div>
				<div className={styles.formFooter}>
					<Button
						isDisabled={!canSubmit}
						type="primary"
						size="small"
						text="Continuar"
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>
					<Link className={styles.a} to="/login">
						já possui login?
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;

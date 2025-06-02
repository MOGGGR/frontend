import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

import Input from "@components/common/Input";
import Button from "@components/common/Button";
import {createAuthController} from "@controllers/auth";
import LoginGameLogo from "../../../assets/LoginGameLogo.svg";
import SoftExtendedLogo from "../../../assets/SoftExtendedLogo.png";
import {validateEmail, validatePassword} from "@components/common/Input/validTypes";

import styles from "../style.module.css";

const initialInputs = [
	{id: "email", label: "E-mail", isRequired: true, type: "email", value: "", error: ""},
	{id: "password", label: "Senha", isRequired: true, type: "password", value: "", error: ""}
];

function Login() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState(initialInputs);
	const {login} = createAuthController();

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
					}
				}
				return {...input, value, error};
			}
			return input;
		});

		setInputs(updatedInputs);
	};

	const canSubmit = inputs.every((i) => i.value && !i.error);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const userData = {};
		inputs.forEach(({id, value}) => {
			userData[id] = value;
		});

		const response = await login(userData);
		if (response) {
			if (response.fgEmailVerified === 3) {
				navigate("/map");
			} else {
				navigate("/confirm-email");
			}
		}
	};

	return (
		<div className={styles["container"]}>
			<img className={styles.logo} src={SoftExtendedLogo} alt="Logo da SoftExpert" />
			<img className={styles.logoLogin} src={LoginGameLogo} alt="Logo da SoftExpert" />
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
					<Button isDisabled={!canSubmit} type="primary" size="small" text="Entrar" onClick={handleSubmit} customStyle={{width: "100%"}} />
					<Link className={styles.a} to="/register">
						Cadastre-se!
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;

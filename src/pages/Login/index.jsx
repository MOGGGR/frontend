import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TextInputList from "@components/common/Input/TextInputList";
import Button from "@components/common/Button";
import loginInputs from "./loginInputs";
import styles from "../Register/style.module.css";

function Login() {
  const navigate = useNavigate();
	const [inputs, setInputs] = useState(loginInputs);
	const isValid = inputs.canSubmit;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);

    navigate("/");
	};

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />

			<form className={styles["form"]} onSubmit={handleSubmit}>
				
      <img className={styles["logo-game"]} src="../../../src/assets/LoginGameLogo.svg" alt="Logo do game" />
        
        <TextInputList data={inputs} setData={setInputs} />

				<div className={styles["formFooter"]}>
					<Button
						isDisabled={!isValid}
						type="primary"
						size="small"
						text={"Entrar"}
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>

					<Link className={styles["a"]} to={"/register"}>
						Cadastre-se!
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Login;

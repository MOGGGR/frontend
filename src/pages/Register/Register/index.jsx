import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import TextInputList from "@components/common/Input/TextInputList";
import Button from "@components/common/Button";
import registerInputs from "./registerInputs";
import styles from "../../Register/style.module.css";

function Register() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState(registerInputs);
	const isValid = inputs.canSubmit;

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputs);

		navigate("/confirm-phone");
	};

	return (
		<div className={styles["content"]}>
			<img className={styles["logo-soft"]} src="../../../src/assets/SoftExtendedLogo.png" alt="Logo da SoftExpert" />

			<form className={styles["form"]} onSubmit={handleSubmit}>
				<TextInputList data={inputs} setData={setInputs} />

				<div className={styles["formFooter"]}>
					<Button
						isDisabled={!isValid}
						type="primary"
						size="small"
						text={"Continuar"}
						onClick={handleSubmit}
						customStyle={{width: "100%"}}
					/>

					<Link className={styles["a"]} to={"/login"}>
						já possui login?
					</Link>
				</div>
			</form>
		</div>
	);
}

export default Register;

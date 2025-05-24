import React from "react";
import {ToastContainer, toast} from "react-toastify";
import styles from "./style.module.css";

function Debug() {
	const notifyErr = () =>
		toast.error("Sou um Toast de erro", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: "colored"
		});

	const notifyWarn = () =>
		toast.warn("Sou um Toast de warning", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: "colored"
		});

	const notifyInfo = () =>
		toast.info("Sou um Toast de Info", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: false,
			progress: undefined,
			theme: "colored"
		});

	const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

	const notifyPromisse = () =>
		toast.promise(resolveAfter3Sec, {
			pending: {
				render() {
					return "To carregando";
				},
				hideProgressBar: true,
				progress: undefined,
				position: "top-center",
			},
			success: {
				render() {
					return "Deu bom";
				},
				theme: "colored",
				icon: "🟢"
			},
			error: {
				render() {
					return "Deu ruim"
				}
			}
		});

	return (
		<div className={styles.content}>
			<button className={styles.button} onClick={notifyErr}>
				Erro
			</button>

			<button className={styles.button} onClick={notifyWarn}>
				Warning
			</button>

			<button className={styles.button} onClick={notifyPromisse}>
				Promisse
			</button>

			<button className={styles.button} onClick={notifyInfo}>
				Info
			</button>

			<ToastContainer limit={1} />
		</div>
	);
}

export default Debug;

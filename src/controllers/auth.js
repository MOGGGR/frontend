import {useState} from "react";

import {useAuthStore} from "@stores/useAuth";
import {AuthRepository} from "@repositories/auth";
import {useToast} from "@components/common/Toast/ToastProvider";
import {jwtDecode} from "jwt-decode";

export function createAuthController() {
	const [loading, setLoading] = useState(false);
	const authRepository = AuthRepository();
	const { addToast } = useToast();

	const setToken = useAuthStore((state) => state.setToken);
	const getToken = useAuthStore((state) => state.token);
	const setUserData = useAuthStore((state) => state.setUserData);
	const setUserMapRouteData = useAuthStore((state) => state.setUserMapRouteData);

	async function login(data) {
		try {
			setLoading(true);
			const response = await authRepository.login(data);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return jwtDecode(response.token);
		} catch (e) {
			console.error("Original error at login: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function register(data) {
		try {
			setLoading(true);
			const response = await authRepository.register(data);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return true;
		} catch (e) {
			console.error("Original error at register: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}
/* 
	async function insertPhone(data) {
		try {
			setLoading(true);
			const response = await authRepository.insertPhone(data, getToken);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return true;
		} catch (e) {
			console.error(e);
			addToast(e.response?.data || e.message);
			return false;
		} finally {
			setLoading(false);
		}
	}
 */
	async function confirmEmail(data) {
		try {
			setLoading(true);
			const response = await authRepository.confirmEmail(data, getToken);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return true;
		} catch (e) {
			console.error("Original error at confirmEmail: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function resendCode() {
		try {
			setLoading(true);
			await authRepository.resendCode();
			return true;
		} catch (e) {
			console.error("Original error at resendCode: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	async function fetchUserData() {
		try {
			setLoading(true);
			const response = await authRepository.fetchUserData();
			setUserMapRouteData(response);
		} catch (e) {
			console.error("Original error at fetchUserData: ", e);
			const error = getErrorMessage(e);
			addToast(error);
		} finally {
			setLoading(false);
		}
	}

	function getErrorMessage(error) {
		let message;

		if (error && error.response && error.response.data && typeof error.response.data.message === 'string') {
			message = error.response.data.message;
		} else if (error && typeof error.message === 'string') {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		} else {
			message = "Ocorreu um erro desconhecido.";
		}
		return message;
	}

	return {
		login,
		register,
		confirmEmail,
		fetchUserData,
		resendCode,
		loading
	};
}

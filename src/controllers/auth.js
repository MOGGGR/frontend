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

	async function login(data) {
		try {
			setLoading(true);
			const response = await authRepository.login(data);
			setToken(response.token);
			setUserData(jwtDecode(response.token));
			return jwtDecode(response.token);
		} catch (e) {
			addToast(e.response?.data?.error || e.message);
			return null;
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
			console.error(e);
			addToast(e.response?.data || e.message);
			return false;
		} finally {
			setLoading(false);
		}
	}

	async function insertEmail(data) {
		try {
			setLoading(true);
			const response = await authRepository.insertEmail(data, getToken);
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

	async function confirmEmail(data) {
		try {
			setLoading(true);
			const response = await authRepository.confirmEmail(data, getToken);
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

	async function resendCode() {
		try {
			setLoading(true);
			await authRepository.resendCode();
			return true;
		} catch (e) {
			console.error(e);
			addToast(e.response?.data || e.message);
			return false;
		} finally {
			setLoading(false);
		}
	}

	async function fetchUserData() {
		try {
			setLoading(true);
			const response = await authRepository.fetchUserData();
			setUserData(response);
		} catch (e) {
			console.error(e);
			addToast(e.response?.data || e.message);
		} finally {
			setLoading(false);
		}
	}

	return {
		login,
		register,
		confirmEmail,
		fetchUserData,
		insertEmail,
		resendCode,
		loading
	};
}

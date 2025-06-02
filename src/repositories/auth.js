import axiosInstance from "../plugins/axios.js";

export function AuthRepository() {
	async function login(data) {
		const response = await axiosInstance.post(`/auth/login`, data);

		return response.data;
	}

	async function register(data) {
		const response = await axiosInstance.post(`/auth/register`, data);
		return response.data;
	}

	async function insertEmail(data) {
		const response = await axiosInstance.post(`/user/insert-email`, data);
		return response.data;
	}

	async function confirmEmail(data) {
		const response = await axiosInstance.post(`/user/confirm-email`, data);
		return response.data;
	}

	async function resendCode() {
		const response = await axiosInstance.post(`/user/resend-code`);
		return response;
	}

	async function fetchUserData() {
		const response = await axiosInstance.get('/user/user-details');
		return response.data;
	}

	return {
		login,
		confirmEmail,
		resendCode,
		fetchUserData,
		insertEmail,
		register
	};
}

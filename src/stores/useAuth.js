import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import {jwtDecode} from "jwt-decode";
import {useToast} from "@components/common/Toast/ToastProvider";

export const useAuthStore = create(
	persist(
		(set, get) => ({
			token: null,
			userData: null,

			userMapRouteData: {
				firstName: 'Foo',
				lastName: 'Bar',
				tickets: 0
			},

			setToken: (token) => set({ token }),
			setUserData: (userData) => set({ userData }),
			setUserMapRouteData: (userMapRouteData) => set({ userMapRouteData }),

			getUserData: () => {
				const token = get().token
				if (!token) return null

				try {

					return jwtDecode(token)
				} catch (err) {
					console.error('Token inválido:', err)
					return null
				}
			},
			clearAuth: () =>
				set({
					token: null,
					userData: null,
				}),
		}),
		{
			name: 'auth-storage',
			// partialize: (state) => ({
			//   token: state.token
			// }),
		}
	)
)

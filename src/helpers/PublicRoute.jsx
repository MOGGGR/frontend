import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@stores/useAuth";

export default function PublicRoute() {
	const getUserData = useAuthStore((state) => state.getUserData)
	const userData = getUserData();

	if (userData?.fgEmailVerified === 2) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}

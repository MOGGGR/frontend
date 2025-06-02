import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthStore} from "@stores/useAuth";

const cards = [
	{id: 3, route: "/wordle"},
	{id: 2, route: "/memory"},
	{id: 1, route: "/quiz"}
];

export default function ProtectedRoute() {
	const token = useAuthStore((state) => state.token);
	const userData = useAuthStore((state) => state.userData);
	const location = useLocation();

	if (!token || !userData) return <Navigate to="/register" replace />;
	if (userData.fgEmailVerified !== 3) return <Navigate to="/confirm-email" replace />;

	const userTasks = userData.tasks || [];
	const currentTaskId = userTasks[userTasks.length - 1];
	const currentCard = cards.find((card) => card.route === location.pathname);

	if (currentCard) {
		const isAccessible = currentCard.id === currentTaskId || userTasks.includes(currentCard.id);

		if (!isAccessible) {
			return <Navigate to="/" replace />;
		}
	}

	return <Outlet />;
}

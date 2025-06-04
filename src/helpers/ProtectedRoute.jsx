import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useAuthStore} from "@stores/useAuth";

const cards = [
	{id: 3, route: "/wordle"},
	{id: 2, route: "/memory"},
	{id: 1, route: "/quiz"}
];

export default function ProtectedRoute() {
	const token = useAuthStore((state) => state.token);
	const getUserData = useAuthStore((state) => state.getUserData)
	const userData = getUserData();
	const location = useLocation();

	console.log(location);
	console.log(!token || !userData);

	if (!token || !userData) return <Navigate to="/register" replace />;
	console.log('111');
	if (userData.fgEmailVerified === 2 && location.pathname === "/confirm-email") return <Navigate to="/" replace />;
	console.log('222');
	if (userData.fgEmailVerified === 1 && location.pathname !== "/confirm-email") return <Navigate to="/confirm-email" replace />;
	console.log('333');

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

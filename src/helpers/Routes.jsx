import { createBrowserRouter } from "react-router-dom";

import Frame from "@components/common/Frame";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import {
	Home,
	Map,
	Wordle,
	Register,
	ConfirmEmail,
	Login,
	Phrase,
	Quiz,
	Memory
} from "../pages";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Frame />,
		children: [
			{ path: "/", element: <Home /> },

			{
				element: <PublicRoute />,
				children: [
					{ path: "/register", element: <Register /> },
					{ path: "/login", element: <Login /> },
				]
			},

			{
				element: <ProtectedRoute />,
				children: [
					{ path: "/map", element: <Map /> },
					{ path: "/wordle", element: <Wordle /> },
					{ path: "/memory", element: <Memory /> },
					{ path: "/phrase", element: <Phrase /> },
					{ path: "/quiz", element: <Quiz /> },
					{ path: "/confirm-email", element: <ConfirmEmail /> }
				]
			}
		]
	}
]);

export default routes;

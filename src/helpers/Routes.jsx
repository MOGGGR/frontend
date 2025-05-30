import {createBrowserRouter} from "react-router-dom";

import Frame from "@components/common/Frame";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import {Home, Map, Wordle, Register, ConfirmEmail, Login, Phrase, Quiz, Memory, History, NotFoundPage, ErrorPage} from "../pages";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Frame />,
		errorElement: <ErrorPage />,
		children: [
			{path: "/", element: <Home />},
			{path: "*", element: <NotFoundPage />},
			{
				element: <PublicRoute />,
				children: [
					{path: "/register", element: <Register />},
					{path: "/login", element: <Login />},
					{path: "/confirm-email", element: <ConfirmEmail />}
				]
			},

			{
				element: <ProtectedRoute />,
				children: [
					{path: "/map", element: <Map />},
					{path: "/wordle", element: <Wordle />},
					{path: "/memory", element: <Memory />},
					{path: "/phrase", element: <Phrase />},
					{path: "/history", element: <History />},
					{path: "/quiz", element: <Quiz />}
				]
			}
		]
	}
]);

export default routes;

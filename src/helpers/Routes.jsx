import {createBrowserRouter} from "react-router-dom";

import Frame from "@components/common/Frame";
import ProtectedRoute from "./ProtectedRoute";
import {Home, Map, Wordle, Register, ConfirmPhone, Login, Phrase, Quiz, Memory, History} from "../pages";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Frame />,
		children: [
			{path: "/", element: <Home />},
			{path: "/register", element: <Register />},
			{path: "/login", element: <Login />},
			{path: "/confirm-phone", element: <ConfirmPhone />},
			{
				element: <ProtectedRoute />,
				children: [
					{path: "/map", element: <Map />},
					{path: "/wordle", element: <Wordle />},
					{path: "/memory", element: <Memory />},
					{path: "/phrase", element: <Phrase />},
					{path: "/quiz", element: <Quiz />},
					{path: "/history", element: <History />}
				]
			}
		]
	}
]);

export default routes;
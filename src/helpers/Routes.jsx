import {createBrowserRouter} from "react-router-dom";

import Frame from "@components/common/Frame";

import {Wordle, ErrorPage} from "../pages";

const routes = createBrowserRouter([
	{
		path: "/",
		element: <Frame />,
		errorElement: <ErrorPage />,
		children: [
			{path: "/", element: <Wordle />},
		]
	}
]);

export default routes;

import { createBrowserRouter } from "react-router-dom";


import { Home, Map, Wordle, Register, Login, ConfirmPhone, Phrase, Quiz } from "../pages";

import Frame from "@components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/confirm-phone", element: <ConfirmPhone /> },
      { path: "/map", element: <Map /> },
      { path: "/wordle", element: <Wordle /> },
      { path: "/phrase", element: <Phrase /> },
      { path: "/quiz", element: <Quiz /> },
    ],
  }
]);

export default routes;
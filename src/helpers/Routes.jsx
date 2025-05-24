import { createBrowserRouter } from "react-router-dom";

import { Home, Map, Wordle, Register, ConfirmPhone, Phrase, Quiz, Memory, Debug } from "../pages";
import Frame from "@components/common/Frame";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Frame />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/confirm-phone", element: <ConfirmPhone /> },
      { path: "/map", element: <Map /> },
      { path: "/memory", element: <Memory /> },
      { path: "/wordle", element: <Wordle /> },
      { path: "/phrase", element: <Phrase /> },
      { path: "/quiz", element: <Quiz /> },
      { path: "/debug", element: <Debug /> },
    ],
  }
]);

export default routes;
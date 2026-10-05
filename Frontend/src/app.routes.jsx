import { createBrowserRouter, Navigate } from "react-router";
import Landing from "./features/landing/pages/Landing";
import Home from "./features/home/pages/Home.jsx";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/detect",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/mood",
    element: <Navigate to="/detect" replace />,
  },
  {
    path: "/app",
    element: <Navigate to="/detect" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

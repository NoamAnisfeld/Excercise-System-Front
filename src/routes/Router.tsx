import {
    createHashRouter as createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainView from "./MainView";
import Login from "./Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainView />,
    },
    {
        path: 'login',
        element: <Login />
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainView from "./MainView";
import MyCoursesButton from "../components/MyCoursesButton";
import Login from "./Login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainView />,
        children: [
            {
                path: '',
                element: <MyCoursesButton />
            },
            {
                path: 'login',
                element: <Login />
            },
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}
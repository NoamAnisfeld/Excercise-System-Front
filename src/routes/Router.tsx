import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import MainView from "./MainView";
import MyCoursesButton from "../components/MyCoursesButton";
import Login from "./Login";
import MyCourses from "./MyCourses";

const router = createBrowserRouter([
    {
        element: <MainView />,
        children: [
            {
                index: true,
                element: <MyCoursesButton />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'my-courses',
                element: <MyCourses />
            }
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import {
    fetchCourses, fetchAssignments
} from "../requests/fetchers"

import MainView from "./MainView"
import Login from "./Login"
import MyCoursesButton from "../components/MyCoursesButton"
import MyCourses, { MyCoursesData } from "./MyCourses"
import CoursePage, { CoursePageData } from "./CoursePage"

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
                children: [
                    {
                        index: true,
                        element: <MyCourses />,
                        loader: async (): Promise<MyCoursesData> =>
                            fetchCourses(),
                    },
                    {
                        path: ':course_id',
                        element: <CoursePage />,
                        loader: async ({ params }): Promise<CoursePageData> =>
                            fetchAssignments(Number(params.course_id))
                    }
                ]
            },
        ]
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}
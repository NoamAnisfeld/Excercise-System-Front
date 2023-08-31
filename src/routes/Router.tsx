import { createBrowserRouter, RouteObject, LoaderFunctionArgs, RouterProvider } from "react-router-dom"

import MainView from "./MainView"
import Login from "./Login"
import MyCoursesButton from "../components/MyCoursesButton"
import MyCourses, { MyCoursesData } from "./MyCourses"
import CoursePage, { CoursePageData } from "./CoursePage"
import AssignmentPage, { AssignmentPageData } from "./AssignmentPage"
import SubmissionPage, { SubmissionPageData } from "./SubmissionPage"
import {
    fetchCourses,
    fetchCourseData,
    fetchCourseAssignments,
    fetchAssignmentData,
    fetchAssignmentSubmissions,
    fetchSubmissionData,
} from "../requests/fetchers"

const submissionsRouteTree: RouteObject[] = [
    {
        path: ':submission_id',
        element: <SubmissionPage />,
        loader: async ({ params }: LoaderFunctionArgs): Promise<SubmissionPageData> =>
            fetchSubmissionData(Number(params.submission_id)),
    }
]

const assignmentsRouteTree: RouteObject[] = [
    {
        path: ':assignment_id',
        children: [
            {
                index: true,
                element: <AssignmentPage />,
                loader: async ({ params }: LoaderFunctionArgs): Promise<AssignmentPageData> =>
                    fetchAssignmentSubmissions(Number(params.assignment_id)),
            },
            {
                path: 'submissions',
                children: submissionsRouteTree,
            }
        ]
    }
]

const coursesRouteTree: RouteObject[] = [
    {
        path: ':course_id',
        children: [
            {
                index: true,
                element: <CoursePage />,
                loader: async ({ params }: LoaderFunctionArgs): Promise<CoursePageData> =>
                    fetchCourseAssignments(Number(params.course_id)),
            },
            {
                path: 'assignments',
                children: assignmentsRouteTree,
            }
        ]
    }
]

const routeTree: RouteObject[] = [
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

                    ...coursesRouteTree,
                ]
            },
        ]
    },
];

const router = createBrowserRouter(routeTree);

export default function Router() {
    return <RouterProvider router={router} />
}
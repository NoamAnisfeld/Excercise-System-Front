import {
    createBrowserRouter,
    RouteObject,
    LoaderFunctionArgs,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom"
import MainLayout from "./MainLayout"
import Login from "./Login"
import AppLayout from "./AppLayout"
import MainOptions from "./MainOptions"
import MyCourses, { MyCoursesData } from "./MyCourses"
import CoursePage, { CoursePageData } from "./CoursePage"
import MyAssignments, { MyAssignmentsData } from "./MyAssignments"
import AssignmentPage, { AssignmentPageData } from "./AssignmentPage"
import MySubmissions, { MySubmissionsData } from "./MySubmissions"
import SubmissionPage, { SubmissionPageData } from "./SubmissionPage"
import {
    fetchCourses,
    fetchAssignments,
    fetchSubmissions,
    fetchCourseAssignments,
    fetchAssignmentSubmissions,
    fetchCourseInfo,
    fetchAssignmentInfo,
    fetchSubmissionInfo,
} from "../requests/fetchers"

const submissionsRouteTree: RouteObject[] = [
    {
        path: ':submission_id',
        element: <SubmissionPage />,
        loader: async ({ params }: LoaderFunctionArgs): Promise<SubmissionPageData> =>
            fetchSubmissionInfo(Number(params.submission_id)),
    }
]

const assignmentsRouteTree: RouteObject[] = [
    {
        path: ':assignment_id',
        children: [
            {
                index: true,
                element: <AssignmentPage />,
                loader: async ({ params }: LoaderFunctionArgs): Promise<AssignmentPageData> => ({
                    assignmentInfo: await fetchAssignmentInfo(Number(params.assignment_id)),
                    submissions: await fetchAssignmentSubmissions(Number(params.assignment_id)),
                })
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
                loader: async ({ params }: LoaderFunctionArgs): Promise<CoursePageData> => ({
                    courseInfo: await fetchCourseInfo(Number(params.course_id)),
                    assignments: await fetchCourseAssignments(Number(params.course_id)),
                }),
            },
            {
                path: 'assignments',
                children: assignmentsRouteTree,
            }
        ]
    }
]

const mainRouteTree: RouteObject[] = [
    {
        element:
            <>
                <ScrollRestoration />
                <MainLayout />
            </>,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                element: <AppLayout />,
                errorElement: <div>error</div>,
                children: [
                    {
                        index: true,
                        element: <MainOptions />
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
                    {
                        path: 'my-assignments',
                        children: [
                            {
                                index: true,
                                element: <MyAssignments />,
                                loader: async (): Promise<MyAssignmentsData> =>
                                    fetchAssignments(),
                            },

                            ...assignmentsRouteTree,
                        ]
                    },
                    {
                        path: 'my-submissions',
                        children: [
                            {
                                index: true,
                                element: <MySubmissions />,
                                loader: async (): Promise<MySubmissionsData> =>
                                    fetchSubmissions(),
                            },

                            ...submissionsRouteTree,
                        ]
                    },
                ]
            },
        ]
    },
];

const router = createBrowserRouter(mainRouteTree);

export default function Router() {
    return <RouterProvider router={router} />
}
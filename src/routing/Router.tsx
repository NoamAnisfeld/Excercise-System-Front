import {
    createBrowserRouter,
    RouteObject,
    LoaderFunctionArgs,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom"
import MainLayout from "../components/main/MainLayout"
import Login from "../components/main/Login"
import AppLayout from "../components/main/AppLayout"
import MainOptions from "../components/main/MainOptions"
import AllCourses, { CoursesInfo } from "../components/courses/AllCourses"
import CoursePage, { CoursePageData } from "../components/courses/CoursePage"
import AllAssignments, { AssignmentsInfo } from "../components/assignments/AllAssignments"
import AssignmentPage, { AssignmentPageData } from "../components/assignments/AssignmentPage"
import AllSubmissions, { SubmissionsInfo } from "../components/submissions/AllSubmissions"
import SubmissionPage, { SubmissionPageData } from "../components/submissions/SubmissionPage"
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
        errorElement: <div>error</div>,
        children: [
            {
                path: '*',
                element: <div>שגיאה 404 - הדף אינו קיים</div>
            },
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
                        path: 'courses',
                        children: [
                            {
                                index: true,
                                element: <AllCourses />,
                                loader: async (): Promise<CoursesInfo> =>
                                    fetchCourses(),
                            },

                            ...coursesRouteTree,
                        ]
                    },
                    {
                        path: 'assignments',
                        children: [
                            {
                                index: true,
                                element: <AllAssignments />,
                                loader: async (): Promise<AssignmentsInfo> =>
                                    fetchAssignments(),
                            },

                            ...assignmentsRouteTree,
                        ]
                    },
                    {
                        path: 'submissions',
                        children: [
                            {
                                index: true,
                                element: <AllSubmissions />,
                                loader: async (): Promise<SubmissionsInfo> =>
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
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
    ScrollRestoration,
    useParams,
} from "react-router-dom"

import MainLayout from "../components/main/MainLayout"
import Login from "../components/main/Login"
import AppLayout from "../components/main/AppLayout"
import MainOptions from "../components/main/MainOptions"
import AllCourses from "../components/courses/AllCourses"
import CoursePage from "../components/courses/CoursePage"
import AllAssignments from "../components/assignments/AllAssignments"
import AssignmentPage from "../components/assignments/AssignmentPage"
import AllSubmissions from "../components/submissions/AllSubmissions"
import SubmissionPage from "../components/submissions/SubmissionPage"
import AllUsers from "../components/users/AllUsers"
import UserPage from "../components/users/UserPage"


function IdProvider({
    Component,
    param,
}: {
    Component: React.FunctionComponent<{ id: number }>,
    param: string,
}) {
    const paramValue = useParams()[param];
    return <Component id={Number(paramValue)} />
}


const submissionsRouteTree: RouteObject[] = [
    {
        path: ':submission_id',
        element: <IdProvider Component={SubmissionPage} param="submission_id" />,
    }
]

const assignmentsRouteTree: RouteObject[] = [
    {
        path: ':assignment_id',
        children: [
            {
                index: true,
                element: <IdProvider Component={AssignmentPage} param="assignment_id" />,
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
                element: <IdProvider Component={CoursePage} param="course_id" />,
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
                            },

                            ...submissionsRouteTree,
                        ]
                    },
                    {
                        path: 'users',
                        children: [
                            {
                                index: true,
                                element: <AllUsers />,
                            },
                            {
                                path: ':user_id',
                                element: <IdProvider Component={UserPage} param="user_id" />,
                            }                                                   
                        ]
                    }
                ]
            },
        ]
    },
];

const router = createBrowserRouter(mainRouteTree);

export default function Router() {
    return <RouterProvider router={router} />
}
import { Link } from "react-router-dom"

import { useLoaderData } from "react-router-dom"
import type { Assignments } from "../requests/schemes"
export type CoursePageData = Assignments;

export default function CoursePage() {
    const assignments = useLoaderData() as Assignments;

    return assignments.map(assignment => (
        <Link to={`assignments/${assignment.id}`}
            key={assignment.id}
            style={{
                display: 'block',
                margin: '1em',
                padding: '1em',
                border: '2px solid',
                whiteSpace: 'pre',
                direction: 'ltr',
            }}
        >
            {JSON.stringify(assignment, undefined, 4)}
        </Link>
    ))
}
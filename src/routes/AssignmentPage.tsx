import { Link } from "react-router-dom"

import { useLoaderData } from "react-router-dom"
import type { Submissions } from "../requests/schemes"
export type AssignmentPageData = Submissions;

export default function AssignmentPage() {
    const submissions = useLoaderData() as Submissions | undefined;

    return (
        submissions ?
        submissions.map(submission => (
            <Link to={`submissions/${submission.id}`}
                key={submission.id}
                style={{
                    display: 'block',
                    margin: '1em',
                    padding: '1em',
                    border: '2px solid',
                    whiteSpace: 'pre',
                    direction: 'ltr',
                }}
            >
                {JSON.stringify(submission, undefined, 4)}
            </Link>
        ))
        : 'טוען...'
    );
}
import { useLoaderData } from "react-router-dom"
import type { Submission } from "../requests/schemes"
export type SubmissionPageData = Submission;

export default function SubmissionPage() {
    const submission = useLoaderData() as Submission;

    return (
        <div
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
        </div>
    )
}
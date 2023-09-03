import { Stack } from "@mui/material"
import SubmissionCard from "../components/SubmissionCard"

import { useLoaderData } from "react-router-dom"
import type { Submissions } from "../requests/schemes"
export type AssignmentPageData = Submissions;

export default function AssignmentPage() {
    const submissions = useLoaderData() as Submissions;

    return (
        <Stack spacing={5} minWidth="80%">
            {submissions.map(submission => <SubmissionCard
                {...submission}
                linkTo={`submissions/${submission.id}`}
                key={submission.id}
            />)}
        </Stack>
    );
}
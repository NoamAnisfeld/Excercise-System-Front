import CardStack from "../components/CardStack"
import SubmissionCard from "../components/SubmissionCard"
import SubmissionDetails from "../components/SubmissionDetails";
import { Box, Typography } from "@mui/material";

import { useLoaderData } from "react-router-dom"
import type { AssignmentInfo, Submissions } from "../requests/schemes"
export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};

export default function AssignmentPage() {
    const { assignmentInfo, submissions } = useLoaderData() as AssignmentPageData;

    return (<>
        <Box display="flex" justifyContent="center" mb={5}>
            <Box display="flex" flexDirection="column" alignContent="center">
                <Typography variant="h1">{assignmentInfo.title}</Typography>
                <Typography variant="subtitle1" component="p">{assignmentInfo.description}</Typography>
            </Box>
        </Box>
        {submissions.length > 1 ?
            <CardStack>
                {submissions.map(submission => <SubmissionCard
                    {...submission}
                    linkTo={`submissions/${submission.id}`}
                    key={submission.id}
                    />)}
            </CardStack>
        : submissions.length === 1 ?
            <SubmissionDetails {...submissions[0]} />
        : undefined}
    </>);
}
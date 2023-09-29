import PageHeader from "../components/PageHeader"
import CardStack from "../components/CardStack"
import SubmissionCard from "../components/SubmissionCard"
import SubmissionDetails from "../components/SubmissionDetails"

import { useLoaderData } from "react-router-dom"
import type { AssignmentInfo, Submissions } from "../requests/schemes"
export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};

export default function AssignmentPage() {
    const { assignmentInfo, submissions } = useLoaderData() as AssignmentPageData;

    return (<>
        <PageHeader title={assignmentInfo.title} subtitle={assignmentInfo.description} />
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
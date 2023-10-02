import PageHeader from "../components/PageHeader"
import CardStack from "../components/CardStack"
import SubmissionCard from "../components/SubmissionCard"
import SubmissionDetails from "../components/SubmissionDetails"
import SubmissionUploader from "../components/SubmissionUploader"
import { submitSubmission } from "../requests/actions"

import { useLoaderData, useNavigate } from "react-router-dom"
import type { AssignmentInfo, Submissions } from "../requests/schemes"
export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};


export default function AssignmentPage() {

    const { assignmentInfo, submissions } = useLoaderData() as AssignmentPageData;
    const refresh = () => useNavigate()(0);
    
    async function handleSubmitSubmission(file: File) {
        // The userId is currently ignored for students (because it uses the student's id) yet
        // required. It's expected to become optional for students, and need to be configurable by
        // non-students
        const userId = 1;
        await submitSubmission(file, assignmentInfo.id, userId);
        refresh();
    }
    
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
        :
            <SubmissionUploader onFileChosen={handleSubmitSubmission} />
        }
    </>);
}
import { useState } from "react"
import PageHeader from "../components/PageHeader"
import CardStack from "../components/CardStack"
import SubmissionCard from "../components/SubmissionCard"
import SubmissionDetails from "../components/SubmissionDetails"
import SubmissionUploader from "../components/SubmissionUploader"
import Alert from "@mui/material/Alert"
import { submitSubmission } from "../requests/actions"

import { useLoaderData, useNavigate } from "react-router-dom"
import type { AssignmentInfo, Submissions } from "../requests/schemes"
import { useAppSelector } from "../hooks"
export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};


interface ErrorAlertInterface {
    userMessage: string,
    errorObject?: Error,
}


export default function AssignmentPage() {

    const [errorAlert, setErrorAlert] = useState<ErrorAlertInterface | null>(null);
    const { assignmentInfo, submissions } = useLoaderData() as AssignmentPageData;
    const { id: userId } = useAppSelector(state => state.userdata);
    const navigate = useNavigate();
    const refresh = () => navigate(0);

    async function handleSubmitSubmission(file: File) {

        try {

            await submitSubmission(file, assignmentInfo.id, userId);
            refresh();
        } catch (e) {
            setErrorAlert({
                userMessage: 'אירעה שגיאה בעת השליחה',
                errorObject: e instanceof Error ? e : undefined,
            });
        }
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
        {errorAlert ?
            <Alert severity="error">
                {errorAlert.userMessage}
                {errorAlert.errorObject ?
                    <>
                        <p><strong>פרטים נוספים:</strong></p>
                        <pre dir="ltr">{JSON.stringify(
                            {
                                name: errorAlert.errorObject.name,
                                message: errorAlert.errorObject.message,
                            },
                            undefined,
                            4
                        )}</pre>
                    </>
                    :
                    undefined
                }
            </Alert>
            :
            undefined
        }
    </>);
}
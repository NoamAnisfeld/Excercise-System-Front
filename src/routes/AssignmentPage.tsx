import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"

import { timeHasPassed, formatDateTime } from "../utils"
import { useAppSelector } from "../hooks"
import type { AssignmentInfo, Submissions } from "../requests/schemes"
import { submitSubmission } from "../requests/actions"

import PageHeader from "../components/PageHeader"
import CardStack from "../components/CardStack"
import ErrorAlert, { ErrorAlertProps } from "../components/ErrorAlert"
import SubmissionCard from "../components/SubmissionCard"
import SubmissionDetails from "../components/SubmissionDetails"
import SubmissionUploader from "../components/SubmissionUploader"

export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};


export default function AssignmentPage() {

    const [errorAlert, setErrorAlert] = useState<ErrorAlertProps | null>(null);
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

    return (
        <>
            <PageHeader title={assignmentInfo.title} subtitle={assignmentInfo.description} />
            {submissions.length === 0 ?
                <>
                    <Typography variant="body1">
                        <strong>זמן אחרון להגשה: </strong>
                        {formatDateTime(assignmentInfo.sub_end_date)}
                    </Typography>

                    {timeHasPassed(new Date(assignmentInfo.sub_end_date)) ?
                        <Typography color="warning.main">הזמן עבר</Typography>
                        :
                        <SubmissionUploader onSubmit={handleSubmitSubmission} />
                    }
                </>
                :
                submissions.length === 1 ?
                    <SubmissionDetails {...submissions[0]} />
                    :
                    <CardStack>
                        {submissions.map(submission => <SubmissionCard
                            {...submission}
                            linkTo={`submissions/${submission.id}`}
                            key={submission.id}
                        />)}
                    </CardStack>
            }
            {errorAlert ? <ErrorAlert {...errorAlert} /> : undefined}
        </>);
}
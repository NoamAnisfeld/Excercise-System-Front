import { useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { Typography } from "@mui/material"

import { timeHasPassed, formatDateTime } from "../../utils"
import { useAppSelector, useViewerIsStaff } from "../../hooks"
import type { AssignmentInfo, Submissions } from "../../requests/schemas"
import { submitSubmission } from "../../requests/actions"

import PageHeader from "../PageHeader"
import CardStack from "../CardStack"
import ErrorAlert, { ErrorAlertProps } from "../ErrorAlert"
import SubmissionCard from "../submissions/SubmissionCard"
import SubmissionDetails from "../submissions/SubmissionDetails"
import SubmissionUploader from "../submissions/SubmissionUploader"
import FadeIn from "../FadeIn"

export type AssignmentPageData = {
    assignmentInfo: AssignmentInfo,
    submissions: Submissions,
};


export default function AssignmentPage() {

    const viewerIsStaff = useViewerIsStaff();
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
        <FadeIn>
            <PageHeader title={assignmentInfo.title} subtitle={assignmentInfo.description} />
            {viewerIsStaff ?
                <>
                    <Typography variant="body1">
                        <strong>זמן אחרון להגשה: </strong>
                        {formatDateTime(assignmentInfo.sub_end_date)}
                    </Typography>
                    {timeHasPassed(new Date(assignmentInfo.sub_end_date)) ?
                        <Typography color="warning.main">הזמן עבר</Typography>
                        :
                        undefined
                    }
                    <CardStack>
                        {submissions.map(submission => <SubmissionCard
                            {...submission}
                            linkTo={`submissions/${submission.id}`}
                            key={submission.id}
                        />)}
                    </CardStack>
                </>
                :
                submissions.length ?
                    <SubmissionDetails {...submissions[0]} />
                    :
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
            }
            {errorAlert ? <ErrorAlert {...errorAlert} /> : undefined}
        </FadeIn>
    );
}
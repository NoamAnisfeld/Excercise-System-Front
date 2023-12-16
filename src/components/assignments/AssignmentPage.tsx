import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchAssignmentInfo, fetchAssignmentSubmissions } from "../../requests/fetchers"
import { submitSubmission } from "../../requests/actions"

import { timeHasPassed, formatDateTime } from "../../utils"
import { useAppSelector, useViewerIsStaff } from "../../hooks"

import { Typography } from "@mui/material"
import PageHeader from "../PageHeader"
import CardStack from "../CardStack"
import ErrorAlert, { ErrorAlertProps } from "../ErrorAlert"
import SubmissionCard from "../submissions/SubmissionCard"
import SubmissionDetails from "../submissions/SubmissionDetails"
import SubmissionUploader from "../submissions/SubmissionUploader"
import FadeIn from "../FadeIn"


export default function AssignmentPage({
    id,
}: {
    id: number,
}) {

    const viewerIsStaff = useViewerIsStaff();
    const { id: userId } = useAppSelector(state => state.userdata);
    const [errorAlert, setErrorAlert] = useState<ErrorAlertProps | null>(null);
    const navigate = useNavigate();
    const refresh = () => navigate(0);
    
    const assignmentQuery = useQuery({
        queryKey: ['assignments', id],
        queryFn: () => fetchAssignmentInfo(id),
    });
    const submissionsQuery = useQuery({
        queryKey: ['assignments', id, 'submissions'],
        queryFn: () => fetchAssignmentSubmissions(id),
    });

    if (assignmentQuery.isError || submissionsQuery.isError) {
        throw new Error('Error fetching assignment or assignment submissions info');
    }
    if (assignmentQuery.isPending || submissionsQuery.isPending) {
        return <>טוען נתונים...</>;
    }
    const assignmentInfo = assignmentQuery.data;
    const submissions = submissionsQuery.data;


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
                            linkTo={`#submission-${submission.id}`}
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
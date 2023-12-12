import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import SubmissionCard from "./SubmissionCard"
import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Submissions } from "../../requests/schemas"
export type SubmissionsInfo = Submissions;

export default function AllSubmissions() {

    const submissionsData = useLoaderData() as SubmissionsInfo;

    return (
        <FadeIn>
            <PageHeader title="כל ההגשות" />
            <CardStack>
                {submissionsData.map(submission => <SubmissionCard
                    {...submission}
                    linkTo={String(submission.id)}
                    key={submission.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
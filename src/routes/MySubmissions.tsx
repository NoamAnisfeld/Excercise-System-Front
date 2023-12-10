import PageHeader from "../components/PageHeader";
import CardStack from "../components/CardStack"
import SubmissionCard from "../components/SubmissionCard"
import FadeIn from "../components/FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Submissions } from "../requests/schemas"
export type MySubmissionsData = Submissions;

export default function MySubmissions() {

    const submissionsData = useLoaderData() as Submissions;

    return (
        <FadeIn>
            <PageHeader title="ההגשות שלי" />
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
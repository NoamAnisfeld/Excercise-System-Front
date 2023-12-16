import { useQuery } from "@tanstack/react-query"
import { fetchSubmissions } from "../../requests/fetchers"

import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import SubmissionCard from "./SubmissionCard"
import FadeIn from "../FadeIn"


export default function AllSubmissions() {

    const { data: submissionsInfo, isError, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchSubmissions,
    });

    if (isError) {
        throw new Error('Failed to fetch submissions');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

    return (
        <FadeIn>
            <PageHeader title="כל ההגשות" />
            <CardStack>
                {submissionsInfo.map(submission => <SubmissionCard
                    {...submission}
                    linkTo={`#submission-${submission.id}`}
                    key={submission.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
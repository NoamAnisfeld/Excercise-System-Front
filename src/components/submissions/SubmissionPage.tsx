import { useQuery } from "@tanstack/react-query"
import { fetchSubmissionInfo } from "../../requests/fetchers"
import FadeIn from "../FadeIn"
import SubmissionDetails from "./SubmissionDetails";

export default function SubmissionPage({
    id,
}: {
    id: number,
}) {
    
    const { data: submission, isError, isPending } = useQuery({
        queryKey: ['submissions', id],
        queryFn: () => fetchSubmissionInfo(id),
    })

    if (isError) {
        throw new Error('Failed to fetch submission info');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

    return (
        <FadeIn>
            <SubmissionDetails {...submission} />
        </FadeIn>
    )
}
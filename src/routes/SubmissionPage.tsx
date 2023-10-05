import { useLoaderData } from "react-router-dom"
import type { SubmissionInfo } from "../requests/schemas"
import SubmissionDetails from "../components/SubmissionDetails";
export type SubmissionPageData = SubmissionInfo;

export default function SubmissionPage() {
    const submission = useLoaderData() as SubmissionInfo;

    return <SubmissionDetails {...submission} />
}
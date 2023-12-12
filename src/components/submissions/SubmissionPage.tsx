import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { SubmissionInfo } from "../../requests/schemas"
import SubmissionDetails from "./SubmissionDetails";
export type SubmissionPageData = SubmissionInfo;

export default function SubmissionPage() {
    const submission = useLoaderData() as SubmissionInfo;

    return (
        <FadeIn>
            <SubmissionDetails {...submission} />
        </FadeIn>
    )
}
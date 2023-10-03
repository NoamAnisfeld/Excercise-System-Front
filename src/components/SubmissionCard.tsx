import ItemCard from "./ItemCard"
import type { SubmissionInfo } from "../requests/schemes"
import { formatDateTime } from "../utils"

export default function SubmissionCard({
    created_at,
    comment,
    linkTo,
}: SubmissionInfo & {
    linkTo: string,
}) {
    return <ItemCard
        title={`הוגשה ב-${formatDateTime(new Date(created_at))}`}
        description={comment && `משוב: ${comment}`}
        linkTo={linkTo}
    />
}
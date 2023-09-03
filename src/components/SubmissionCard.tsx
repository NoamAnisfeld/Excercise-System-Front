import ItemCard from "./ItemCard"
import type { Submission } from "../requests/schemes"
import { formatDateTime } from "../utils"

export default function SubmissionCard({
    created_at,
    comment,
    linkTo,
}: Submission & {
    linkTo: string,
}) {
    return <ItemCard
        title={`הוגשה ב-${formatDateTime(new Date(created_at))}`}
        description={`משוב: ${comment}`}
        linkTo={linkTo}
    />
}
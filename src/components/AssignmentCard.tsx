import ItemCard from "./ItemCard"
import type { AssignmentInfo } from "../requests/schemes"

export default function AssignmentCard({
    title,
    description,
    linkTo,
}: AssignmentInfo & {
    linkTo: string,
}) {
    return <ItemCard
        title={title}
        description={description}
        linkTo={linkTo}
    />
}
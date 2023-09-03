import ItemCard from "./ItemCard"
import type { Assignment } from "../requests/schemes"

export default function AssignmentCard({
    title,
    description,
    linkTo,
}: Assignment & {
    linkTo: string,
}) {
    return <ItemCard
        title={title}
        description={description}
        linkTo={linkTo}
    />
}
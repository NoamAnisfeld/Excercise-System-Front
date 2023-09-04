import ItemCard from "./ItemCard"
import type { CourseInfo } from "../requests/schemes"

export default function CourseCard({
    name,
    description,
    linkTo,
}: CourseInfo & {
    linkTo: string,
}) {
    return <ItemCard
        title={name}
        description={description}
        linkTo={linkTo}
    />
}
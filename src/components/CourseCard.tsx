import ItemCard from "./ItemCard"
import type { Course } from "../requests/schemes"

export default function CourseCard({
    name,
    description,
    linkTo,
}: Course & {
    linkTo: string,
}) {
    return <ItemCard
        title={name}
        description={description}
        linkTo={linkTo}
    />
}
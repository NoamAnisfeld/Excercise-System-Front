import CardStack from "../components/CardStack"
import AssignmentCard from "../components/AssignmentCard"

import { useLoaderData } from "react-router-dom"
import type { Assignments } from "../requests/schemes"
export type CoursePageData = Assignments;

export default function CoursePage() {
    const assignments = useLoaderData() as Assignments;

    return (
        <CardStack>
            {assignments.map(assignment => <AssignmentCard
                {...assignment}
                linkTo={`assignments/${assignment.id}`}
                key={assignment.id}
            />)}
        </CardStack>
    );
}
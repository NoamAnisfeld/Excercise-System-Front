import PageHeader from "../components/PageHeader";
import CardStack from "../components/CardStack"
import AssignmentCard from "../components/AssignmentCard"
import FadeIn from "../components/FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Assignments } from "../requests/schemas"
export type MyAssignmentsData = Assignments;

export default function MyAssignments() {

    const assignmentsData = useLoaderData() as Assignments;

    return (
        <FadeIn>
            <PageHeader title="התרגילים שלי" />
            <CardStack>
                {assignmentsData.map(assignment => <AssignmentCard
                    {...assignment}
                    linkTo={String(assignment.id)}
                    key={assignment.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
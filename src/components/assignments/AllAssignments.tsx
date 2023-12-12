import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import AssignmentCard from "./AssignmentCard"
import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Assignments } from "../../requests/schemas"
export type AssignmentsInfo = Assignments;

export default function AllAssignments() {

    const assignmentsInfo = useLoaderData() as AssignmentsInfo;

    return (
        <FadeIn>
            <PageHeader title="כל התרגילים" />
            <CardStack>
                {assignmentsInfo.map(assignment => <AssignmentCard
                    {...assignment}
                    linkTo={String(assignment.id)}
                    key={assignment.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
import { useQuery } from "@tanstack/react-query"
import { fetchAssignments } from "../../requests/fetchers"

import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import AssignmentCard from "./AssignmentCard"
import FadeIn from "../FadeIn"


export default function AllAssignments() {

    const { data: assignmentsInfo, isError, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchAssignments,
    });

    if (isError) {
        throw new Error('Failed to fetch assignments');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

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
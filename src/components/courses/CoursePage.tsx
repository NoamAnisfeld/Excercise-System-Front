import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import AssignmentCard from "../assignments/AssignmentCard"
import FadeIn from "../FadeIn"
import { useQuery } from "@tanstack/react-query";
import { fetchCourseAssignments, fetchCourseInfo } from "../../requests/fetchers";


export default function CoursePage({
    id,
}: {
    id: number,
}) {

    const courseQuery = useQuery({
        queryKey: ['courses', id],
        queryFn: () => fetchCourseInfo(id),
    });
    const assignmentsQuery = useQuery({
        queryKey: ['courses', id, 'assignments'],
        queryFn: () => fetchCourseAssignments(id),
    })

    if (courseQuery.isError || assignmentsQuery.isError) {
        throw new Error('Error fetching course or course assignments info');
    }
    if (courseQuery.isPending || assignmentsQuery.isPending) {
        return <>טוען נתונים...</>;
    }
    const courseInfo = courseQuery.data;
    const assignments = assignmentsQuery.data;

    return (
        <FadeIn>
            <PageHeader title={courseInfo.name} subtitle={courseInfo.description} />
            <CardStack>
                {assignments.map(assignment => <AssignmentCard
                    {...assignment}
                    linkTo={`assignments/${assignment.id}`}
                    key={assignment.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
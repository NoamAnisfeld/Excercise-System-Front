import PageHeader from "../components/PageHeader";
import CardStack from "../components/CardStack"
import AssignmentCard from "../components/AssignmentCard"
import FadeIn from "../components/FadeIn"

import { useLoaderData } from "react-router-dom"
import type { CourseInfo, Assignments } from "../requests/schemas"
export type CoursePageData = {
    courseInfo: CourseInfo,
    assignments: Assignments
};

export default function CoursePage() {
    const { courseInfo, assignments } = useLoaderData() as CoursePageData;

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
import { Stack } from "@mui/material";
import AssignmentCard from "../components/AssignmentCard";

import { useLoaderData } from "react-router-dom"
import type { Assignments } from "../requests/schemes"
export type CoursePageData = Assignments;

export default function CoursePage() {
    const assignments = useLoaderData() as Assignments;

    return (
        <Stack spacing={5} minWidth="80%">
            {assignments.map(assignment => <AssignmentCard
                {...assignment}
                linkTo={`assignments/${assignment.id}`}
                key={assignment.id}
            />)}
        </Stack>
    );
}
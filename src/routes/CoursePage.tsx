import CardStack from "../components/CardStack"
import AssignmentCard from "../components/AssignmentCard"
import { Box, Typography } from "@mui/material";

import { useLoaderData } from "react-router-dom"
import type { CourseInfo, Assignments } from "../requests/schemes"
export type CoursePageData = {
    courseInfo: CourseInfo,
    assignments: Assignments
};

export default function CoursePage() {
    const { courseInfo, assignments } = useLoaderData() as CoursePageData;

    return (<>
        <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" alignContent="center">
                <Typography variant="h1">{courseInfo.name}</Typography>
                <Typography variant="subtitle1" component="p">{courseInfo.description}</Typography>
            </Box>
        </Box>
        <CardStack>
            {assignments.map(assignment => <AssignmentCard
                {...assignment}
                linkTo={`assignments/${assignment.id}`}
                key={assignment.id}
            />)}
        </CardStack>
    </>);
}
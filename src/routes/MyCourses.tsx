import CardStack from "../components/CardStack"
import CourseCard from "../components/CourseCard"
import { Typography } from "@mui/material";

import { useLoaderData } from "react-router-dom"
import type { Courses } from "../requests/schemes"
export type MyCoursesData = Courses;

export default function MyCourses() {

    const coursesData = useLoaderData() as Courses;

    return (<>
        <Typography variant="h1" align="center">הקורסים שלי</Typography>
        <CardStack>
            {coursesData.map(course => <CourseCard
                {...course}
                linkTo={String(course.id)}
                key={course.id}
            />)}
        </CardStack>
    </>);
}
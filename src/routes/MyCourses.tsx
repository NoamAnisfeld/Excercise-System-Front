import { Stack } from "@mui/material"
import CourseCard from "../components/CourseCard"

import { useLoaderData } from "react-router-dom"
import type { Courses } from "../requests/schemes"
export type MyCoursesData = Courses;

export default function MyCourses() {

    const coursesData = useLoaderData() as Courses | undefined;

    return (
        coursesData ?
        <Stack spacing={5} minWidth="80%">
            {coursesData.map(course => <CourseCard
                {...course}
                linkTo={String(course.id)}
                key={course.id}
            />)}
        </Stack>
        : 'טוען...'
    );
}
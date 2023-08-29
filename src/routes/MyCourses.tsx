import { Stack } from "@mui/material"
import CourseCard from "../components/CourseCard"

import { useLoaderData } from "react-router-dom"
import type { Courses } from "../requests/schemes"
export type MyCoursesData = Courses;

export default function MyCourses() {

    const coursesData = useLoaderData() as Courses | undefined;

    console.info({ coursesData });

    return (
        coursesData ?
        <Stack spacing={5} minWidth="80%">
            {coursesData.map(course => <CourseCard
                key={course.id}
                {...course}
            />)}
        </Stack>
        : 'טוען...'
    );
}
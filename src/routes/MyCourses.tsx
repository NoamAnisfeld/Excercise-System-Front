import { useState } from "react"
import { fetchCourses } from "../requests/fetchers"
import type { Courses } from "../requests/schemes"
import { Stack } from "@mui/material"
import CourseCard from "../components/CourseCard"

export default function MyCourses() {
    const [coursesData, setCoursesData] = useState<Courses>([]);

    if (!coursesData.length)
        fetchCourses().then(courses => courses.length && setCoursesData(courses));

    return <Stack spacing={5} minWidth="80%">
        {coursesData.length ?
        coursesData.map(course => <CourseCard
            key={course.id}
            {...course}
        />)
        : "טוען..."}
    </Stack>
}
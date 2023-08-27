import { useState } from "react"
import { getCourses } from "../requests/getCourses"
import { Stack } from "@mui/material"
import CourseCard from "../components/CourseCard"

export default function MyCourses() {
    const [coursesData, setCoursesData] = useState([]);

    if (!coursesData.length)
        getCourses().then(setCoursesData);

    return <Stack spacing={5} minWidth="80%">
        {coursesData.map(course => <CourseCard
            key={course.course_id}
            id={course.course_id}
            name={course.course_name}
        />)}
    </Stack>
}
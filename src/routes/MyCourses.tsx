import CardStack from "../components/CardStack"
import CourseCard from "../components/CourseCard"

import { useLoaderData } from "react-router-dom"
import type { Courses } from "../requests/schemes"
export type MyCoursesData = Courses;

export default function MyCourses() {

    const coursesData = useLoaderData() as Courses;

    return (<>
        <CardStack>
            {coursesData.map(course => <CourseCard
                {...course}
                linkTo={String(course.id)}
                key={course.id}
            />)}
        </CardStack>
    </>);
}
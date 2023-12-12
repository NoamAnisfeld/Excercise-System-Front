import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import CourseCard from "./CourseCard"
import FadeIn from "../FadeIn"

import { useLoaderData } from "react-router-dom"
import type { Courses } from "../../requests/schemas"
export type CoursesInfo = Courses;

export default function AllCourses() {

    const coursesInfo = useLoaderData() as CoursesInfo;

    return (
        <FadeIn>
            <PageHeader title="הקורסים שלי" />
            <CardStack>
                {coursesInfo.map(course => <CourseCard
                    {...course}
                    linkTo={String(course.id)}
                    key={course.id}
                />)}
            </CardStack>
        </FadeIn>
    );
}
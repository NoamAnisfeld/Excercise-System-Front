import { useQuery } from "@tanstack/react-query"
import { fetchCourses } from "../../requests/fetchers"

import PageHeader from "../PageHeader";
import CardStack from "../CardStack"
import CourseCard from "./CourseCard"
import FadeIn from "../FadeIn"


export default function AllCourses() {

    const { data: coursesInfo, isError, isPending } = useQuery({
        queryKey: ['users'],
        queryFn: fetchCourses,
    });

    if (isError) {
        throw new Error('Failed to fetch courses');
    }
    if (isPending) {
        return <>טוען נתונים...</>
    }

    return (
        <FadeIn>
            <PageHeader title="כל הקורסים" />
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
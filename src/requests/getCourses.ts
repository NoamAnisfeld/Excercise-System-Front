import { ZodError, z } from 'zod';

const course = z.object({
    course_id: z.string(),
    course_name: z.string(),
});
type Course = z.infer<typeof course>;

const courses = z.array(course);
export type Courses = z.infer<typeof courses>;

if (process.env.NODE_ENV === 'development') {
    import('../mocks/browser').then(({ worker }) => worker.start());
}

export async function getCourses() {
    await new Promise(res => setTimeout(res, 1000));

    try {
        const
            fetchData = await fetch('/courses'),
            jsonData: Courses = await fetchData.json(),
            validatedData = courses.parse(jsonData);

        return validatedData;

    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log('invalid JSON');
            return [];
        } else if (e instanceof ZodError) {
            console.log('invalid data');
            return []
        } else {
            throw e;
        }
    }
}
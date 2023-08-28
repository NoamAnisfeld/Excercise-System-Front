import { ZodError, z } from 'zod'
import { coursesScheme, assignmentsScheme } from './schemes'

if (process.env.NODE_ENV === 'development') {
    await import('../mocks/browser').then(({ worker }) => worker.start());
}

async function fetchApiData<T>(url: string, validationScheme: z.ZodType<T>) {
    
    try {
        const
            fetchedData = await fetch(url),
            jsonData: T = await fetchedData.json(),
            validatedData = validationScheme.parse(jsonData);

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

export async function fetchCourses() {
    return await fetchApiData('/api/courses', coursesScheme);
}

export async function fetchAssignments(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}/assignments`, assignmentsScheme);
}
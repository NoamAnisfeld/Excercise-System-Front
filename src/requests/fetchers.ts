import { ZodError, z } from 'zod'
import {
    courseInfoScheme, coursesScheme,
    assignmentInfoScheme, assignmentsScheme,
    submissionInfoScheme, submissionsScheme,
} from './schemes'

if (process.env.NODE_ENV === 'development')
    import('../mocks/browser');

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || location.origin;

async function fetchApiData<T>(
    path: string,
    validationScheme: z.ZodType<T>,
    accessToken = import.meta.env.VITE_DEVELOPMENT_API_ACCESS_TOKEN as string,
) {
    
    let clonedFetchedData: Response | undefined = undefined;
    const headers = new Headers({
        Authorization: 'Bearer ' + accessToken,
    })

    const url = API_BASE_URL + path;

    try {
        const fetchedData = await fetch(url, {
            headers,
            mode: 'cors',
        });
        clonedFetchedData = fetchedData.clone();

        if (!fetchedData.ok)
            throw Error('request failed');

        const
            jsonData: T = await fetchedData.json(),
            validatedData = validationScheme.parse(jsonData);

        return validatedData;

    } catch (e) {
        clonedFetchedData?.text().then(console.error);

        if (e instanceof SyntaxError) {
            throw SyntaxError('invalid JSON');
        } else if (e instanceof ZodError) {
            throw TypeError('invalid data');
        } else {
            throw e;
        }
    }
}

export async function fetchCourses() {
    return await fetchApiData('/api/courses/', coursesScheme);
}

export async function fetchCourseInfo(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}/`, courseInfoScheme);
}

export async function fetchCourseAssignments(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}/assignments/`, assignmentsScheme);
}

export async function fetchAssignmentInfo(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}/`, assignmentInfoScheme);
}

export async function fetchAssignmentSubmissions(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}/submissions/`, submissionsScheme);
}

export async function fetchSubmissionInfo(submissionId: number) {
    return await fetchApiData(`/api/submissions/${submissionId}/`, submissionInfoScheme);
}

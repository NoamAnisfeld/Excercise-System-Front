import { ZodError, z } from 'zod'
import {
    courseInfoScheme, coursesScheme,
    assignmentInfoScheme, assignmentsScheme,
    submissionInfoScheme, submissionsScheme,
} from './schemes'

if (process.env.NODE_ENV === 'development') {
    await import('../mocks/browser').then(({ worker }) => worker.start());
}

async function fetchApiData<T>(url: string, validationScheme: z.ZodType<T>) {
    
    let clonedFetchedData: Response | undefined = undefined;

    try {
        const fetchedData = await fetch(url);
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
    return await fetchApiData('/api/courses', coursesScheme);
}

export async function fetchCourseInfo(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}`, courseInfoScheme);
}

export async function fetchCourseAssignments(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}/assignments`, assignmentsScheme);
}

export async function fetchAssignmentInfo(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}`, assignmentInfoScheme);
}

export async function fetchAssignmentSubmissions(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}/submissions`, submissionsScheme);
}

export async function fetchSubmissionInfo(submissionId: number) {
    return await fetchApiData(`/api/submissions/${submissionId}`, submissionInfoScheme);
}

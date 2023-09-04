import { ZodError, z } from 'zod'
import {
    courseScheme, coursesScheme,
    assignmentScheme, assignmentsScheme,
    submissionScheme, submissionsScheme,
} from './schemes'

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

export async function fetchCourseData(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}`, courseScheme);
}

export async function fetchCourseAssignments(courseId: number) {
    return await fetchApiData(`/api/courses/${courseId}/assignments`, assignmentsScheme);
}

export async function fetchAssignmentData(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}`, assignmentScheme);
}

export async function fetchAssignmentSubmissions(assignmentId: number) {
    return await fetchApiData(`/api/assignments/${assignmentId}/submissions`, submissionsScheme);
}

export async function fetchSubmissionData(submissionId: number) {
    return await fetchApiData(`/api/submissions/${submissionId}`, submissionScheme);
}

import { ZodError, z } from 'zod'
import {
    courseInfoScheme, coursesScheme,
    assignmentInfoScheme, assignmentsScheme,
    submissionInfoScheme, submissionsScheme,
} from './schemes'
import { getApiSession, InvalidTokenError } from './auth'
import { API_BASE_URL, HTTP } from '../utils'


async function makeRequest(path: string, accessToken: string) {

    return await fetch(API_BASE_URL + path, {
        headers: new Headers({
            Authorization: 'Bearer ' + accessToken,
        }),
        mode: 'cors',
    });
}


async function fetchApiData<T>(
    path: string,
    validationScheme: z.ZodType<T>,
) {
    const apiSession = getApiSession();

    if (!apiSession.isLoggedIn())
        throw new InvalidTokenError('User is not logged in');

    try {
        let accessToken = await apiSession.getAccessToken();
        let response = await makeRequest(path, accessToken);

        if (response.status === HTTP.Unauthorized) {
            await apiSession.refreshTokens();
            accessToken = await apiSession.getAccessToken();
            response = await makeRequest(path, accessToken);
        }

        if (response.status === HTTP.Unauthorized)
            throw new InvalidTokenError('Unexpected issue with access token. Try logout and login back');

        if (!response.ok)
            throw new Error('Request failed');

        const json: T = await response.json();
        const validatedData = validationScheme.parse(json);
        return validatedData;

    } catch (e) {
        if (e instanceof SyntaxError) {
            throw new SyntaxError('invalid JSON');
        } else if (e instanceof ZodError) {
            throw new TypeError('invalid data');
        } else {
            throw e;
        }
    }
}


export async function fetchCourses() {
    return await fetchApiData('/courses/', coursesScheme);
}


export async function fetchCourseInfo(courseId: number) {
    return await fetchApiData(`/courses/${courseId}/`, courseInfoScheme);
}


export async function fetchCourseAssignments(courseId: number) {
    return await fetchApiData(`/courses/${courseId}/assignments/`, assignmentsScheme);
}


export async function fetchAssignmentInfo(assignmentId: number) {
    return await fetchApiData(`/assignments/${assignmentId}/`, assignmentInfoScheme);
}


export async function fetchAssignmentSubmissions(assignmentId: number) {
    return await fetchApiData(`/assignments/${assignmentId}/submissions/`, submissionsScheme);
}


export async function fetchSubmissionInfo(submissionId: number) {
    return await fetchApiData(`/submissions/${submissionId}/`, submissionInfoScheme);
}

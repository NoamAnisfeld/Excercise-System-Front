import { ZodError, z } from 'zod'
import {
    courseInfoScheme, coursesScheme,
    assignmentInfoScheme, assignmentsScheme,
    submissionInfoScheme, submissionsScheme,
} from './schemes'
import { ApiSession, InvalidTokenError } from './auth'
import { HTTP } from '../utils'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string || location.origin;
type MaybeApiSession = ApiSession | null;

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
    apiSession: MaybeApiSession,
) {

    if (!apiSession || !apiSession.isLoggedIn())
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


export async function fetchCourses(apiSession: MaybeApiSession) {
    return await fetchApiData('/api/courses/', coursesScheme, apiSession);
}


export async function fetchCourseInfo(courseId: number, apiSession: MaybeApiSession) {
    return await fetchApiData(`/api/courses/${courseId}/`, courseInfoScheme, apiSession);
}


export async function fetchCourseAssignments(courseId: number, apiSession: MaybeApiSession) {
    return await fetchApiData(`/api/courses/${courseId}/assignments/`, assignmentsScheme, apiSession);
}


export async function fetchAssignmentInfo(assignmentId: number, apiSession: MaybeApiSession) {
    return await fetchApiData(`/api/assignments/${assignmentId}/`, assignmentInfoScheme, apiSession);
}


export async function fetchAssignmentSubmissions(assignmentId: number, apiSession: MaybeApiSession) {
    return await fetchApiData(`/api/assignments/${assignmentId}/submissions/`, submissionsScheme, apiSession);
}


export async function fetchSubmissionInfo(submissionId: number, apiSession: MaybeApiSession) {
    return await fetchApiData(`/api/submissions/${submissionId}/`, submissionInfoScheme, apiSession);
}

import { ZodError, z } from 'zod'
import {
    courseInfoSchema, coursesSchema,
    assignmentInfoSchema, assignmentsSchema,
    submissionInfoSchema, submissionsSchema,
    userInfoSchema, UserInfo,
} from './schemas'
import { getApiSession, InvalidTokenError } from './auth'
import { API_BASE_URL, HTTP, sleep } from '../utils'


async function makeRequest(path: string, accessToken: string) {

    return await fetch(API_BASE_URL + path, {
        headers: new Headers({
            Authorization: 'Bearer ' + accessToken,
        }),
    });
}


async function fetchApiData<T>(
    path: string,
    validationSchema: z.ZodType<T>,
) {
    const apiSession = getApiSession();

    if (!apiSession.isLoggedIn()) {
        // deals with session resume period when page loads
        const MAX_WAITING = 5000;
        const INTERVAL = 100;
        let times = MAX_WAITING / INTERVAL;

        while (apiSession.sessionMightResume() && times > 0) {
            await sleep(INTERVAL);
            times--;
        }

        if (!apiSession.isLoggedIn()) {
            throw new InvalidTokenError('User is not logged in');
        }
    }

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

        if (!response.ok) {
            let errorMessage: string;

            try {
                ({ error: errorMessage } = await response.json());
            } catch {
                throw new Error(`Server responded with HTTP ${response.status}`);
            }
            throw new Error(`Server responded with HTTP ${response.status}: ${errorMessage}`);
        }

        const json: T = await response.json();
        const validatedData = validationSchema.parse(json);
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


export async function fetchUserInfo(userId: number): Promise<UserInfo> {
    return await fetchApiData(`/users/${userId}/`, userInfoSchema);
}


export async function fetchCourses() {
    return await fetchApiData('/courses/', coursesSchema);
}


export async function fetchCourseInfo(courseId: number) {
    return await fetchApiData(`/courses/${courseId}/`, courseInfoSchema);
}


export async function fetchCourseAssignments(courseId: number) {
    return await fetchApiData(`/courses/${courseId}/assignments/`, assignmentsSchema);
}


export async function fetchAssignmentInfo(assignmentId: number) {
    return await fetchApiData(`/assignments/${assignmentId}/`, assignmentInfoSchema);
}


export async function fetchAssignmentSubmissions(assignmentId: number) {
    return await fetchApiData(`/assignments/${assignmentId}/submissions/`, submissionsSchema);
}


export async function fetchSubmissionInfo(submissionId: number) {
    return await fetchApiData(`/submissions/${submissionId}/`, submissionInfoSchema);
}

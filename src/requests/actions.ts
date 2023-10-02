import { ZodError, z } from 'zod'
import {
    submissionInfoScheme,
} from './schemes'
import { getApiSession, InvalidTokenError } from './auth'
import { API_BASE_URL, HTTP } from '../utils'


async function makeRequest(path: string, accessToken: string, payload: BodyInit, method: string) {

    return await fetch(API_BASE_URL + path, {
        method: method,
        headers: new Headers({
            Authorization: 'Bearer ' + accessToken,
        }),
        body: payload,
    });
}


async function performApiAction<T>(
    path: string,
    validationScheme: z.ZodType<T>,
    payload: BodyInit,
    method = 'POST',
) {
    const apiSession = getApiSession();

    if (!apiSession.isLoggedIn())
        throw new InvalidTokenError('User is not logged in');

    try {
        let accessToken = await apiSession.getAccessToken();
        let response = await makeRequest(path, accessToken, payload, method);

        if (response.status === HTTP.Unauthorized) {
            await apiSession.refreshTokens();
            accessToken = await apiSession.getAccessToken();
            response = await makeRequest(path, accessToken, payload, method);
        }

        if (response.status === HTTP.Unauthorized)
            throw new InvalidTokenError('Unexpected issue with access token. Try logout and login back');

        if (!response.ok) {
            let errorMessage: string;

            try {
                ({ error: errorMessage } = await response.json());
            } catch {
                debugger;
                throw new Error(`Server responded with HTTP ${response.status}`);
            }
            throw new Error(`Server responded with HTTP ${response.status}: ${errorMessage}`);
        }

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


export async function submitSubmission(file: File, assignmentId: number, userId: number) {

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignment', String(assignmentId));
    // expected to become optional for students
    formData.append('user', String(userId));
    // expected to be removed, it's a bug
    formData.append('comment', '');
    

    return await performApiAction(
        '/submissions/',
        submissionInfoScheme,
        formData,
    );
}
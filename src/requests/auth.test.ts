import { describe, test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import {
    getApiSession,
    resetApiSession,
    InvalidCredentialsError,
    InvalidTokenError,
} from "./auth.js"
import mockUsers from '../mocks/users.json'
import { setStorageItem, removeStorageItem } from "../utils.js";


// declared here but only assigned later, after the mock server 
// has already replaced global.fetch with it's own
let originalFetch: typeof global.fetch;
function createCustomFetch(originalFetch: typeof global.fetch) {
    return (...args: Parameters<typeof originalFetch>): ReturnType<typeof originalFetch> => {

        if (typeof args[0] !== 'string') {
            return originalFetch(...args);
        } else {
            const newArgs: typeof args = [...args];
            newArgs[0] = (new URL(args[0], location.origin).href);
            return originalFetch(...newArgs);
        }
    }
}

let apiSession = getApiSession();

beforeAll(() => server.listen());

beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = createCustomFetch(originalFetch);

    removeStorageItem('refreshToken')
    apiSession = resetApiSession();
})

afterEach(() => {
    server.resetHandlers();
    global.fetch = originalFetch;
});

afterAll(() => server.close());


describe.shuffle('stored sessions', () => {

    test('original state is not logged in', () => {
        expect(apiSession.isLoggedIn()).toBe(false);        
    })

    test('successful login and logout', async () => {

        await expect(apiSession.login({
            email: mockUsers[1].email,
            password: mockUsers[1].first_name
        })).resolves.not.toThrowError();

        expect(apiSession.isLoggedIn()).toBe(true);

        apiSession.logout();
        expect(apiSession.isLoggedIn()).toBe(false);
    })


    test('bad login fails', async () => {

        await expect(apiSession.login({
            email: mockUsers[1].email,
            password: 'wrongPassword'
        })).rejects.toThrow(InvalidCredentialsError);

        expect(apiSession.isLoggedIn()).toBe(false);
    })


    test('successful session resume when given a valid refresh token', async () => {

        const refreshToken = JSON.stringify({
            type: 'refresh',
            userId: 1,
            createdAt: Date.now(),
            expired: false,
        });

        await expect(apiSession.resumeSession(refreshToken)).resolves.not.toThrowError();
        await expect(apiSession.getAccessToken()).resolves.toBeTypeOf('string');
        expect(apiSession.isLoggedIn()).toBe(true);
        await expect(apiSession.refreshTokens()).resolves.not.toThrowError();
    })


    test('session resume fails when an invaild refresh token is given', async () => {

        const refreshToken = JSON.stringify({
            type: 'refresh',
            userId: 0,
            createdAt: Date.now(),
            expired: true,
        });

        await expect(apiSession.resumeSession(refreshToken)).rejects.toThrow(InvalidTokenError);
        expect(apiSession.isLoggedIn()).toBe(false);
        await expect(apiSession.refreshTokens()).rejects.toThrow(InvalidTokenError);
    })
})
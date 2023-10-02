import { test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import {
    getApiSession,
    resetApiSession,
    InvalidCredentialsError,
    InvalidTokenError,
} from "./auth.js"
import mockUsers from '../mocks/users.json'
import { setStorageItem } from "../utils.js";


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

    apiSession = resetApiSession();
})

afterEach(() => {
    server.resetHandlers();
    global.fetch = originalFetch;
});

afterAll(() => server.close());


test('successful login and logout', async () => {

    expect(apiSession.isLoggedIn()).toBe(false);

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


test('successful session resume when a valid refresh token exists on localStorage', async () => {

    const refreshToken = JSON.stringify({
        type: 'refresh',
        userId: 1,
        createdAt: Date.now(),
        expired: false,
    });
    setStorageItem('refreshToken', refreshToken);
    const newApiSession = resetApiSession();

    expect(newApiSession.isLoggedIn()).toBe(true);
    await expect(newApiSession.refreshTokens()).resolves.not.toThrowError();
})


test('session resume fails when an invaild refresh token is stored on localStorage', async () => {

    const refreshToken = JSON.stringify({
        type: 'refresh',
        userId: 0,
        createdAt: Date.now(),
        expired: true,
    });
    setStorageItem('refreshToken', refreshToken);
    const newApiSession = resetApiSession();

    expect(newApiSession.isLoggedIn()).toBe(true);
    await expect(newApiSession.refreshTokens()).rejects.toThrow(InvalidTokenError);
    expect(newApiSession.isLoggedIn()).toBe(false);
})
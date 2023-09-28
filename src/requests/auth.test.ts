import { test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import { ApiSession, InvalidCredentialsError, InvalidTokenError } from "./auth.js"
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

let apiSession: ApiSession;

beforeAll(() => server.listen());

beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = createCustomFetch(originalFetch);

    apiSession = new ApiSession();
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


test('refresh token retrieved from local storage', async () => {

    const originalLocalStorage = globalThis.localStorage;
    const mockLocalStorage = {
        _entries: new Map<string, string>(),

        getItem(key: string): string | null {
            return this._entries.get(key) || null;
        },

        setItem(key: string, value: string) {
            this._entries.set(key, value);
        },

        removeItem(key: string) {
            this._entries.delete(key);
        }
    };
    // @ts-ignore
    global.localStorage = mockLocalStorage as Storage;

    try {
        const refreshToken = {
            type: 'refresh',
            userId: 1,
            createdAt: Date.now(),
            expired: false,
        };
        setStorageItem('refreshToken', JSON.stringify(refreshToken));
        const newApiSession = new ApiSession();

        expect(newApiSession.isLoggedIn()).toBe(true);
        await expect(newApiSession.refreshTokens()).resolves.not.toThrowError();

    } finally {
        globalThis.localStorage = originalLocalStorage;
    }
})


test('bad refresh token does not work', async () => {

    const originalLocalStorage = globalThis.localStorage;
    const mockLocalStorage = {
        _entries: new Map<string, string>(),

        getItem(key: string): string | null {
            return this._entries.get(key) || null;
        },

        setItem(key: string, value: string) {
            this._entries.set(key, value);
        },

        removeItem(key: string) {
            this._entries.delete(key);
        }
    };
    // @ts-ignore
    global.localStorage = mockLocalStorage as Storage;

    try {
        const refreshToken = {
            type: 'refresh',
            userId: 0,
            createdAt: Date.now(),
            expired: true,
        };
        setStorageItem('refreshToken', JSON.stringify(refreshToken));
        const newApiSession = new ApiSession();

        expect(newApiSession.isLoggedIn()).toBe(true);
        await expect(newApiSession.refreshTokens()).rejects.toThrow(InvalidTokenError);
        expect(newApiSession.isLoggedIn()).toBe(false);

    } finally {
        globalThis.localStorage = originalLocalStorage;
    }
})
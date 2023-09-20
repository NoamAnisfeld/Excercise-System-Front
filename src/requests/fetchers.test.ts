import { test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import mockCourses from '../mocks/courses.json'
import mockAssignments from '../mocks/assignments.json'
import mockSubmissions from '../mocks/submissions.json'
import { loggedInUserId } from "../mocks/handlers.js"
import {
    fetchCourses,
    fetchCourseAssignments,
    fetchAssignmentSubmissions,
} from "./fetchers.js"
import users from '../mocks/users.json'

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

beforeAll(async () => {
    server.listen();

    originalFetch = global.fetch;
    global.fetch = createCustomFetch(originalFetch);

    const request = await fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify({
            email: users[0].email,
            password: users[0].first_name
        }),
    });

    if (!request.ok) {
        throw Error('Mock login failed');
    }

    global.fetch = originalFetch;
});

beforeEach(async () => {
    originalFetch = global.fetch;
    global.fetch = createCustomFetch(originalFetch);
})

afterEach(() => {
    server.resetHandlers();
    global.fetch = originalFetch;
});

afterAll(() => server.close());

test('fetch courses', async () => {
    const fetchedData = await fetchCourses();
    expect(fetchedData).toEqual(mockCourses);
})

test('fetch assignments for course 1', async () => {
    const fetchedData = await fetchCourseAssignments(1);
    expect(fetchedData).toEqual(mockAssignments.filter(item => item.course === 1));
})

test('fetch assignments for course 2', async () => {
    const fetchedData = await fetchCourseAssignments(2);
    expect(fetchedData).toEqual(mockAssignments.filter(item => item.course === 2));
})

test('fetch submissions for assignment 3', async () => {
    const fetchedData = await fetchAssignmentSubmissions(3);
    expect(fetchedData).toEqual(mockSubmissions.filter(item =>
        item.assignment === 3 &&
        item.user === loggedInUserId
    ));
})

test('fetch submissions for assignment 6', async () => {
    const fetchedData = await fetchAssignmentSubmissions(6);
    expect(fetchedData).toEqual(mockSubmissions.filter(item =>
        item.assignment === 6 &&
        item.user === loggedInUserId
    ));
})
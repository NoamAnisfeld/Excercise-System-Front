import { test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import mockCourses from '../mocks/courses.json'
import mockAssignments from '../mocks/assignments.json'
import mockSubmissions from '../mocks/submissions.json'
import { MOCK_LOGGED_USER_ID } from "../mocks/handlers.js"
import {
    fetchCourses,
    fetchCourseAssignments,
    fetchAssignmentSubmissions,
} from "./fetchers.js"

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

beforeAll(() => server.listen());
beforeEach(() => {
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

test('fetch assignments for course 0', async () => {
    const fetchedData = await fetchCourseAssignments(0);
    expect(fetchedData).toEqual(mockAssignments.filter(item => item.course_id === 0));
})

test('fetch assignments for course 1', async () => {
    const fetchedData = await fetchCourseAssignments(1);
    expect(fetchedData).toEqual(mockAssignments.filter(item => item.course_id === 1));
})

test('fetch submissions for assignment 0', async () => {
    const fetchedData = await fetchAssignmentSubmissions(0);
    expect(fetchedData).toEqual(mockSubmissions.filter(item =>
        item.assignment_id === 0 &&
        item.user_id === MOCK_LOGGED_USER_ID
    ));
})

test('fetch submissions for assignment 2', async () => {
    const fetchedData = await fetchAssignmentSubmissions(2);
    expect(fetchedData).toEqual(mockSubmissions.filter(item =>
        item.assignment_id === 2 &&
        item.user_id === MOCK_LOGGED_USER_ID
    ));
})
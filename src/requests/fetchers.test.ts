import { test, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest"
import { server } from '../mocks/server.js'
import mockCourses from '../mocks/courses.json'
import mockAssignments from '../mocks/assignments.json'
import mockSubmissions from '../mocks/submissions.json'
import {
    fetchCourses,
    fetchAssignments,
    fetchSubmissions,
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

test('fetch assignments', async () => {
    const fetchedData = await fetchAssignments(0);
    expect(fetchedData).toEqual(mockAssignments);
})

test('fetch submissions', async () => {
    const fetchedData = await fetchSubmissions(0);
    expect(fetchedData).toEqual(mockSubmissions);
})
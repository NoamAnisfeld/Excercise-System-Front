import { test, expect, beforeAll, afterEach, afterAll } from "vitest"
import { server } from './server.js'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('fetch list of courses', async () => {

    const
        coursesData = await fetch(new URL('/api/courses', location.origin).href),
        coursesJsonData = await coursesData.json();
        expect(coursesJsonData).not.toBeUndefined();
})
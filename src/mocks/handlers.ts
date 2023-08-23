import { rest } from 'msw'
import courses from './courses.json'

export const handlers = [
    rest.get('/courses', (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(courses),
        )
        }),
];
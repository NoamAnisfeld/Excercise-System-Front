import { rest } from 'msw'
import courses from './courses.json'
import { HTTP } from '../utils'

export const handlers = [
    rest.post('/login', async (req, res, ctx) => {
        const json = await req.json();
        const username = json.username;
        
        if (username === 'developer') {
            return res(
                ctx.status(HTTP.OK),
                ctx.cookie('session', 'development', {
                    httpOnly: true,
                }),
                ctx.cookie('username', username),
            )
        } else {
            return res(
                ctx.status(HTTP.Unauthorized),
            )
        }
    }),

    rest.post('/logout', (_req, res, ctx) => {
        return res(
            ctx.status(HTTP.OK),
            ctx.cookie('session', '', {
                maxAge: 0,
                httpOnly: true,
            }),
            ctx.cookie('username', '', {
                maxAge: 0,
            }),
        )
    }),

    rest.get('/courses', (_req, res, ctx) => {
        return res(
            ctx.status(HTTP.OK),
            ctx.json(courses),
        )
    }),
];
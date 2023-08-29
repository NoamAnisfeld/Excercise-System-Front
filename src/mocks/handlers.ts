import { rest } from 'msw'
import courses from './courses.json'
import assignments from './assignments.json'
import submissions from './submissions.json'
import { HTTP } from '../utils'

export const handlers = [
    rest.post('/api/login', async (req, res, ctx) => {
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

    rest.post('/api/logout', (_req, res, ctx) => {
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

    rest.get('/api/courses', (_req, res, ctx) => {
        return res(
            ctx.status(HTTP.OK),
            ctx.json(courses),
        )
    }),

    rest.get('/api/courses/:course_id/assignments', (req, res, ctx) => {

        const { course_id } = req.params;
        const courseAssignments = [...assignments];

        for (let i in courseAssignments) {
            courseAssignments[i] = {...courseAssignments[i], course: Number(course_id) };
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(courseAssignments),
        )
    }),

    rest.get('/api/assignments/:assignment_id/submissions', (req, res, ctx) => {

        const { assignment_id } = req.params;
        const assignmentSubmissions = [...submissions];

        for (let i in assignmentSubmissions) {
            assignmentSubmissions[i] = {...assignmentSubmissions[i], assignment: Number(assignment_id) };
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(assignmentSubmissions),
        )
    }),
];
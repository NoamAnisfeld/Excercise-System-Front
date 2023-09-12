import { rest } from 'msw'
import courses from './courses.json'
import assignments from './assignments.json'
import submissions from './submissions.json'
import { HTTP } from '../utils'

export const MOCK_LOGGED_USER_ID = 1;

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

    rest.get('/api/courses/:course_id', (req, res, ctx) => {

        const course_id = Number(req.params.course_id);
        const courseData = courses.find(item =>
            item.id === course_id);

        if (!courseData) {
            return res(
                ctx.status(HTTP.NotFound)
            )
        } else {
            return res(
                ctx.status(HTTP.OK),
                ctx.json(courseData),
            )
        }
    }),

    rest.get('/api/courses/:course_id/assignments', (req, res, ctx) => {

        const course_id = Number(req.params.course_id);
        const courseAssignments = assignments.filter(item =>
            item.course_id === course_id);

        return res(
            ctx.status(HTTP.OK),
            ctx.json(courseAssignments),
        )
    }),

    rest.get('/api/assignments/:assignment_id', (req, res, ctx) => {

        const assignment_id = Number(req.params.assignment_id);
        const assignmentData = assignments.find(item =>
            item.id === assignment_id);

        if (!assignmentData) {
            return res(
                ctx.status(HTTP.NotFound)
            )
        } else {
            return res(
                ctx.status(HTTP.OK),
                ctx.json(assignmentData),
            )
        }
    }),

    rest.get('/api/assignments/:assignment_id/submissions', (req, res, ctx) => {

        const assignment_id = Number(req.params.assignment_id);
        if (!Number.isInteger(assignment_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const relevantSubmissions = submissions.filter(item =>
            item.assignment_id === assignment_id &&
            item.user_id === MOCK_LOGGED_USER_ID
        );

        return res(
            ctx.status(HTTP.OK),
            ctx.json(relevantSubmissions),
        )
    }),

    rest.get('/api/submissions/:submission_id', (req, res, ctx) => {

        const { submission_id } = req.params;
        const submission = submissions.find(item => item.id === Number(submission_id));

        if (!submission) {
            return res(
                ctx.status(HTTP.NotFound)
            )
        } else if (submission.user_id !== MOCK_LOGGED_USER_ID) {
            return res(
                ctx.status(HTTP.Unauthorized)
            )
        } else {
            return res(
                ctx.status(HTTP.OK),
                ctx.json(submission),
            )
        }
    }),
];
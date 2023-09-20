import { rest } from 'msw'
import users from './users.json'
import courses from './courses.json'
import assignments from './assignments.json'
import submissions from './submissions.json'
import { HTTP } from '../utils'

export let loggedInUserId: number | null =
        users.find(item =>
            item.username === localStorage.getItem((import.meta.env.VITE_STORAGE_PREFIX || '') + 'username')
        )?.id || null;

export const handlers = [
    rest.post('/api/login/', async (req, res, ctx) => {
        const json = await req.json();
        const { email, password } = json;

        const user = users.find(item => email === item.email && /* mock */password === item.first_name)

        if (user) {
            loggedInUserId = user.id;
            return res(
                ctx.status(HTTP.OK),
            )
        } else {
            return res(
                ctx.status(HTTP.Unauthorized),
            )
        }
    }),

    rest.get('/api/courses/', (_req, res, ctx) => {
        return res(
            ctx.status(HTTP.OK),
            ctx.json(courses),
        )
    }),

    rest.get('/api/courses/:course_id/', (req, res, ctx) => {

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

    rest.get('/api/courses/:course_id/assignments/', (req, res, ctx) => {

        const course_id = Number(req.params.course_id);
        const courseAssignments = assignments.filter(item =>
            item.course === course_id);

        return res(
            ctx.status(HTTP.OK),
            ctx.json(courseAssignments),
        )
    }),

    rest.get('/api/assignments/:assignment_id/', (req, res, ctx) => {

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

    rest.get('/api/assignments/:assignment_id/submissions/', (req, res, ctx) => {

        const assignment_id = Number(req.params.assignment_id);
        if (!Number.isInteger(assignment_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const relevantSubmissions = submissions.filter(item =>
            item.assignment === assignment_id &&
            item.user === loggedInUserId
        );

        return res(
            ctx.status(HTTP.OK),
            ctx.json(relevantSubmissions),
        )
    }),

    rest.get('/api/submissions/:submission_id/', (req, res, ctx) => {

        const { submission_id } = req.params;
        const submission = submissions.find(item => item.id === Number(submission_id));

        if (!submission) {
            return res(
                ctx.status(HTTP.NotFound)
            )
        } else if (submission.user !== loggedInUserId) {
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
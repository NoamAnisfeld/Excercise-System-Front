import { rest } from 'msw'
import courses from './courses.json'
import assignments from './assignments.json'
import submissions from './submissions.json'
import { HTTP } from '../utils'
import { authHandlers, validateAuthorizedUser } from './auth-handlers'

export const handlers = [

    ...authHandlers,

    rest.get('/api/courses/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(courses),
        );
    }),

    rest.get('/api/courses/:course_id/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        const course_id = Number(req.params.course_id);
        if (!Number.isInteger(course_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            );
        }

        const courseData = courses.find(item => item.id === course_id);
        if (!courseData) {
            return res(
                ctx.status(HTTP.NotFound)
            );
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(courseData),
        );
    }),

    rest.get('/api/courses/:course_id/assignments/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        const course_id = Number(req.params.course_id);
        if (!Number.isInteger(course_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const relevantAssignments = assignments.filter(item => item.course === course_id);

        return res(
            ctx.status(HTTP.OK),
            ctx.json(relevantAssignments),
        )
    }),

    rest.get('/api/assignments/:assignment_id/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        const assignment_id = Number(req.params.assignment_id);
        if (!Number.isInteger(assignment_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const assignmentData = assignments.find(item => item.id === assignment_id);
        if (!assignmentData) {
            return res(
                ctx.status(HTTP.NotFound)
            )
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(assignmentData),
        )

    }),

    rest.get('/api/assignments/:assignment_id/submissions/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        const assignment_id = Number(req.params.assignment_id);
        if (!Number.isInteger(assignment_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const relevantSubmissions = submissions.filter(item =>
            item.assignment === assignment_id
        );

        return res(
            ctx.status(HTTP.OK),
            ctx.json(relevantSubmissions),
        )
    }),

    rest.get('/api/submissions/:submission_id/', (req, res, ctx) => {

        const userId = validateAuthorizedUser(req);
        if (userId === null) {
            return res(
                ctx.status(HTTP.Unauthorized),
            );
        }

        const submission_id = Number(req.params.submission_id);
        if (!Number.isInteger(submission_id)) {
            return res(
                ctx.status(HTTP.BadRequest)
            )
        }

        const submission = submissions.find(item => item.id === submission_id);
        if (!submission) {
            return res(
                ctx.status(HTTP.NotFound)
            );
        }

        return res(
            ctx.status(HTTP.OK),
            ctx.json(submission),
        );

    }),
];
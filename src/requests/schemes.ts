import { z } from 'zod'


export const apiTokensScheme = z.object({
    refresh: z.string(),
    access: z.string(),
});
export type ApiTokens = z.infer<typeof apiTokensScheme>


export const refreshedApiTokensScheme = z.object({
    access: z.string(),
});
export type RefreshedApiTokens = z.infer<typeof refreshedApiTokensScheme>


export const apiTokenClaimsScheme = z.object({
    token_type: z.string(),
    exp: z.number(),
    user_id: z.number(),
    role: z.string(),
});
export type ApiTokenClaims = z.infer<typeof apiTokenClaimsScheme>


export const userInfoScheme = z.object({
    id: z.number(),
    username: z.string().optional(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});
export type UserInfo = z.infer<typeof userInfoScheme>


export const courseInfoScheme = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    classrooms: z.array(z.number()),
});
export type CourseInfo = z.infer<typeof courseInfoScheme>


export const coursesScheme = z.array(courseInfoScheme);
export type Courses = z.infer<typeof coursesScheme>;


export const assignmentInfoScheme = z.object(
    {
        id: z.number(),
        title: z.string(),
        description: z.string().nullable(),
        sub_end_date: z.string(),
        course: z.number(),
    }
)
export type AssignmentInfo = z.infer<typeof assignmentInfoScheme>


export const assignmentsScheme = z.array(assignmentInfoScheme);
export type Assignments = z.infer<typeof assignmentsScheme>;


export const submissionInfoScheme = z.object(
    {
        id: z.number(),
        sub_date: z.string(),
        file: z.string(),
        comment: z.string().nullable(),
        created_at: z.string(),
        updated_at: z.string(),
        user: z.number(),
        assignment: z.number(),
        score: z.number(),
    }
)
export type SubmissionInfo = z.infer<typeof submissionInfoScheme>


export const submissionsScheme = z.array(submissionInfoScheme);
export type Submissions = z.infer<typeof submissionsScheme>;


export const authTokensScheme = z.object(
    {
        refreshToken: z.string(),
        accessToken: z.string(),
    }
);
export type AuthTokens = z.infer<typeof authTokensScheme>
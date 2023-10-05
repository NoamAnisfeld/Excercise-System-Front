import { z } from 'zod'


export const apiTokensSchema = z.object({
    refresh: z.string(),
    access: z.string(),
});
export type ApiTokens = z.infer<typeof apiTokensSchema>


export const refreshedApiTokensSchema = z.object({
    access: z.string(),
});
export type RefreshedApiTokens = z.infer<typeof refreshedApiTokensSchema>


export const apiTokenClaimsSchema = z.object({
    token_type: z.string(),
    exp: z.number(),
    user_id: z.number(),
    role: z.string(),
});
export type ApiTokenClaims = z.infer<typeof apiTokenClaimsSchema>


export const userInfoSchema = z.object({
    id: z.number(),
    username: z.string().nullable(),
    email: z.string(),
    first_name: z.string(),
    last_name: z.string(),
});
export type UserInfo = z.infer<typeof userInfoSchema>


export const courseInfoSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    classrooms: z.array(z.number()),
});
export type CourseInfo = z.infer<typeof courseInfoSchema>


export const coursesSchema = z.array(courseInfoSchema);
export type Courses = z.infer<typeof coursesSchema>;


export const assignmentInfoSchema = z.object(
    {
        id: z.number(),
        title: z.string(),
        description: z.string().nullable(),
        sub_end_date: z.string(),
        course: z.number(),
    }
)
export type AssignmentInfo = z.infer<typeof assignmentInfoSchema>


export const assignmentsSchema = z.array(assignmentInfoSchema);
export type Assignments = z.infer<typeof assignmentsSchema>;


export const submissionInfoSchema = z.object(
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
export type SubmissionInfo = z.infer<typeof submissionInfoSchema>


export const submissionsSchema = z.array(submissionInfoSchema);
export type Submissions = z.infer<typeof submissionsSchema>;


export const authTokensSchema = z.object(
    {
        refreshToken: z.string(),
        accessToken: z.string(),
    }
);
export type AuthTokens = z.infer<typeof authTokensSchema>
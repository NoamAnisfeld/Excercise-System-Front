import { z } from 'zod'


export const tokensScheme = z.object({
    refresh: z.string(),
    access: z.string(),
});
export type TokensInfo = z.infer<typeof tokensScheme>


export const refreshedTokensScheme = z.object({
    access: z.string(),
});
export type RefreshedTokensInfo = z.infer<typeof refreshedTokensScheme>


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
import { z } from 'zod';

export const courseScheme = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    classrooms: z.array(z.number()),
});
export type Course = z.infer<typeof courseScheme>

export const coursesScheme = z.array(courseScheme);
export type Courses = z.infer<typeof coursesScheme>;

export const assignmentScheme = z.object(
    {
        id: z.number(),
        title: z.string(),
        description: z.string(),
        sub_end_date: z.string(),
        course: z.number(),
    }
)
export type Assignment = z.infer<typeof assignmentScheme>

export const assignmentsScheme = z.array(assignmentScheme);
export type Assignments = z.infer<typeof assignmentsScheme>;

export const submissionScheme = z.object(
    {
        id: z.number(),
        sub_date: z.string(),
        file: z.string(),
        comment: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        user: z.number(),
        assignment: z.number(),
    }
)
export type Submission = z.infer<typeof submissionScheme>

export const submissionsScheme = z.array(submissionScheme);
export type Submissions = z.infer<typeof submissionsScheme>;

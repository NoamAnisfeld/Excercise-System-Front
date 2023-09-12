import { z } from 'zod';

export const courseInfoScheme = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    classrooms: z.array(z.number()),
});
export type CourseInfo = z.infer<typeof courseInfoScheme>

export const coursesScheme = z.array(courseInfoScheme);
export type Courses = z.infer<typeof coursesScheme>;

export const assignmentInfoScheme = z.object(
    {
        id: z.number(),
        title: z.string(),
        description: z.string(),
        sub_end_date: z.string(),
        course_id: z.number(),
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
        comment: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        user_id: z.number(),
        assignment_id: z.number(),
        score: z.number(),
    }
)
export type SubmissionInfo = z.infer<typeof submissionInfoScheme>

export const submissionsScheme = z.array(submissionInfoScheme);
export type Submissions = z.infer<typeof submissionsScheme>;

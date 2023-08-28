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

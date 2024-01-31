import { z } from "zod";

const FIELD_REQUIRED_STR = "This field is required";

export const CreateMilestoneSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be a string",
      required_error: FIELD_REQUIRED_STR,
    })
    .min(3, "Title must have at least 3 characters")
    .trim(),

  date: z
    .date({
      invalid_type_error: "Date must be a valid date",
      required_error: FIELD_REQUIRED_STR,
    })
    .transform((date) => date.toISOString()),

  description: z
    .string({
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .optional(),
});

export type CreateMilestoneSchemaProps = z.infer<typeof CreateMilestoneSchema>;

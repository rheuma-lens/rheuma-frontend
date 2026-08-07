import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const requiredString = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`);

export const optionalString = z.string().optional();

export const positiveNumber = z.number().positive("Must be a positive number");

export const getFieldErrors = (
  error: z.ZodError,
): Record<string, string> => {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
};

export const safeParse = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
): { success: true; data: T } | { success: false; errors: Record<string, string> } => {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: getFieldErrors(result.error) };
};

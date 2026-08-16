import { z } from "zod";
import type { Resolver, FieldErrors } from "react-hook-form";

interface FieldError {
  type: string;
  message: string;
}

export const zodResolver =
  <TFieldValues extends Record<string, unknown>>(
    schema: z.ZodSchema<TFieldValues>,
  ): Resolver<TFieldValues> =>
  async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }
    const errors: Record<string, FieldError> = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".") || "root";
      errors[path] = { type: issue.code, message: issue.message };
    });
    return {
      values: {},
      errors: errors as unknown as FieldErrors<TFieldValues>,
    };
  };

export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "نام دسته‌بندی باید حداقل ۲ کاراکتر باشد" }),
  code: z.string().min(2, { message: "کد دسته‌بندی باید حداقل ۲ کاراکتر باشد" }),
  description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;

export const sampleFormSchema = z.object({
  category_id: z.number({ message: "انتخاب دسته‌بندی الزامی است" }),
  name: z.string().min(2, { message: "نام نمونه باید حداقل ۲ کاراکتر باشد" }),
  code: z.string().min(2, { message: "کد شناسایی باید حداقل ۲ کاراکتر باشد" }),
  sample_type: z.string().default("TYPE_A"),
  unit: z.string().optional(),
  value: z.number().optional().default(0),
});

export type SampleFormData = z.infer<typeof sampleFormSchema>;

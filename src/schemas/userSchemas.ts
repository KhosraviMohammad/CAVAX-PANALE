import { z } from "zod";
import { zodResolver } from "./sampleSchemas";

export const createUserSchema = z.object({
  phone_number: z.string().min(1, { message: "شماره تلفن الزامی است" }),
  username: z.string().min(1, { message: "نام کاربری الزامی است" }),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  email: z.string().email({ message: "ایمیل وارد شده معتبر نیست" }).optional().or(z.literal("")),
  gender: z.string().default("male"),
  national_code: z.string().optional(),
  is_active: z.boolean().default(true),
  verified: z.boolean().default(true),
  is_admin: z.boolean().default(false),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;

export { zodResolver };

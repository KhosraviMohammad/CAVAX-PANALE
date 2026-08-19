import { z } from "zod";
import { zodResolver } from "./sampleSchemas";

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: "ورود نام کاربری الزامی است" }),
  password: z.string().min(1, { message: "ورود رمز عبور الزامی است" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export { zodResolver };

import { z } from "zod";
import { zodResolver } from "./sampleSchemas";

export const adjustWalletSchema = z.object({
  direction: z.enum(["credit", "debit"], {
    required_error: "نوع تعدیل الزامی است",
  }),
  amount: z
    .string()
    .min(1, { message: "مبلغ تعدیل الزامی است" })
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
      message: "مبلغ تعدیل باید عددی بزرگتر از صفر باشد",
    }),
  reason: z.string().min(1, { message: "دلیل تعدیل الزامی است" }),
});

export type AdjustWalletFormData = z.infer<typeof adjustWalletSchema>;

export { zodResolver };

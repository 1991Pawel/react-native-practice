import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .min(1, { message: "Kod jest wymagany" })
    .length(6, { message: "Kod musi mieć dokładnie 6 znaków" }),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;

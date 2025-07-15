import { z } from "zod";

export const verifyCodeSchema = z.object({
  code: z.string().min(1, { message: "Verification code is required" }),
});

export type VerifyCodeSchemaType = z.infer<typeof verifyCodeSchema>;

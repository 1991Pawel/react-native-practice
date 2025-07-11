import { z } from "zod";

export const loginSchema = z.object({
  emailAddress: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

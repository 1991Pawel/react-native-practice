import { z } from "zod";

export const registerSchema = z.object({
  emailAddress: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

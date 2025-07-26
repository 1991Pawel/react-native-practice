import { z } from "zod";

export const editProfileSchema = z.object({
  name: z.string().min(1, { message: "Imię jest wymagane" }),
});

export type EditProfileSchemaType = z.infer<typeof editProfileSchema>;

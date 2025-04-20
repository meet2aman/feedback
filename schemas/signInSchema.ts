import { z } from "zod";

export const signInSchema = z.object({
  identifier: z.string().toLowerCase(),
  password: z.string(),
});

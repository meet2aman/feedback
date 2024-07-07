import { z } from "zod";

export const contactSchema = z.object({
  email: z.string(),
  name: z.string(),
  content: z.string(),
});

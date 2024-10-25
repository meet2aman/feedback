import { z } from "zod";

export const verifySchema = z.object({
  pin: z.string().length(6, "Verification code must be 6 digits"),
});

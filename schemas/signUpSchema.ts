import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be at almost 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");
export const emailValidation = z
  .string()
  .min(8, "Email must be at least 8 characters")
  .email({ message: "Please enter a valid email address" });
export const passwordValidation = z
  .string()
  .min(6, "Password must be at least 6 characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});

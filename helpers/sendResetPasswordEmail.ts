import ForgotPasswordEmail from "@/emails/ForgotPasswordEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";


export async function sendResetPasswordEmail(
  email: string,
  userID: string,
  username: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Reset your password",
      //@ts-ignore
      react: ForgotPasswordEmail({ email, userID, username }),
    });
    return { success: true, message: "Reset password email sent successfully" };
  } catch (emailError) {
    console.error("Error sending Reset Password email", emailError);
    return { success: false, message: "Failed to send Reset Password email" };
  }
}

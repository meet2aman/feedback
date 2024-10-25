import ContactEmail from "@/emails/ContactEmail";
import { resend } from "@/lib/resend";
import { ApiResponse } from "@/types/ApiResponse";

export async function contactEmail(
  email: string,
  content: string,
  name: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "meet2amankushwaha@gmail.com",
      subject: "Contact Email From Feedback",
      //@ts-ignore
      react: ContactEmail({ email, content, name }),
    });
    return { success: true, message: "Contact Email sent successfully" };
  } catch (emailError) {
    console.error("Error sending contact email", emailError);
    return { success: false, message: "Failed to send contact email" };
  }
}

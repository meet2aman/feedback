import { contactEmail } from "@/helpers/sendContactEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { error: "Request Not Hitted" },
        { status: 405 }
      );
    }
    const reqBody = await request.json();
    const { email, name, content } = reqBody;

    const emailResponse = await contactEmail(email, content, name);

    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: "Contact email failed to sent",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Contact email sent successfully.",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("Error in sending contact Email. " + error);
    return Response.json(
      {
        success: false,
        message: "Error in sending contact email.",
      },
      {
        status: 500,
      }
    );
  }
}

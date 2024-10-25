import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/User";
import jwt, { sign } from "jsonwebtoken";
import dbConnect from "@/db/dbConfig";
import { sendResetPasswordEmail } from "@/helpers/sendResetPasswordEmail";

export async function POST(request: NextRequest, response: NextResponse) {
  await dbConnect();
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Request Not Hitted" }, { status: 405 });
  }

  const reqBody = await request.json();
  const { email } = reqBody;

  try {
    /// check user email in database
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const token = sign({ userID: user._id }, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    console.log(token);
    await user.updateOne({ email }, { $set: { forgotPasswordToken: token } });

    //   send verification email

    const userID = user._id;
    const { username } = user;
    const emailResponse = await sendResetPasswordEmail(email, userID, username);

    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: "Reseting password failed",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: "Password reset email sent",
        success: true,
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("Error reseting password: " + error);
    return Response.json(
      {
        success: false,
        message: "Error reseting password",
      },
      {
        status: 500,
      }
    );
  }
}

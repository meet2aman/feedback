import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { identifier, password } = reqBody;

    /////check if user exits

    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return NextResponse.json({
        message: "User Does Not Exist",
        success: false,
      });
    }

    ///check if password is correct
    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({
        message: "Password is incorrect",
        success: false,
      });
    }
    /////create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user.isVerified,
      isAcceptingMessages: user.isAcceptingMessage,
    };
    //// create token
    const token = jwt.sign(tokenData, process.env.NEXTAUTH_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Logged in successfully",
        success: true,
      },
      {
        status: 200,
      }
    );

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Error while logging in",
        success: false,
      },
      { status: 500 }
    );
  }
}

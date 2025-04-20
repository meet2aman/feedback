import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import { error } from "console";

export async function POST(request: NextRequest, response: NextResponse) {
  if (request.method !== "POST") {
    return NextResponse.json({ status: 400 });
  }

  try {
    await dbConnect();
    const { password, token } = await request.json();
    const decodedToken = decodeURIComponent(token);
    const user = await UserModel.findOne({ forgotPasswordToken: decodedToken });



    if (!user) {
      console.log(`no user found`);
      return NextResponse.json(
        { message: "invalid Token", success: false },
        { status: 400 }
      );
    }
    const { forgotPasswordToken } = user; // Destructuring forgotPasswordToken

    if (decodedToken !== forgotPasswordToken) {
      console.log(decodedToken === forgotPasswordToken);
      console.log("not matched");
    }

    //if matched
    if (forgotPasswordToken === decodedToken) {
      console.log(decodedToken === forgotPasswordToken);

      //Hashing the newPassword
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      //updating the hashed NewPassword to password field in db
      user.password = hashedPassword;

      //after sucessfully update remove forgotPasswordToken And ForgotPasswordExpiry to null
      user.forgotPasswordToken = undefined;
      user.forgotPasswordTokenExpiry = undefined;

      //and sving the user in db
      const savedUser = await user.save();
    }
    return NextResponse.json(
      {
        message: "Password Changed successfully",
        success: true,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  const { username } = await request.json();
  try {
    const checkUserInDB = await UserModel.findOne({ username });
    const email = checkUserInDB?.email || "";
    if (!checkUserInDB) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 400,
        }
      );
    }
    if (checkUserInDB.isVerified === true) {
      return Response.json(
        {
          success: false,
          message: "Account is already verified.",
        },
        {
          status: 400,
        }
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    checkUserInDB.verifyCode = verifyCode;
    checkUserInDB.verifyCodeExpiry = new Date(Date.now() + 3600000);
    await checkUserInDB.save();
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse) {
      return Response.json(
        {
          success: false,
          message: "Verification failed",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Verification Email sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("error while sending verification email " + error);
    return Response.json(
      {
        success: false,
        message: "Error while sending verification email ",
      },
      {
        status: 500,
      }
    );
  }
}

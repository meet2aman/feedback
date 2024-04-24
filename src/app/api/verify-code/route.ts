import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import { z } from "zod";
import { verifySchema } from "@/schemas/verifySchema";

const VerifyQuerySchema = z.object({
  code: verifySchema,
});

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }
    if (user.isVerified === true) {
      const response = Response.json(
        {
          success: true,
          message: "This account is already verified. Please login.",
        },
        {
          status: 200,
        }
      );

      return response;
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    }
    // else if (!isCodeNotExpired) {
    //   console.log("else if");
    //   return Response.json(
    //     {
    //       success: false,
    //       message:
    //         "Verification Code has been Expired please sign up again to get a new one",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }
    else {
      console.log("Incorrect verification code");
      return Response.json(
        {
          success: false,
          message: "Incorrect verification code",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error: any) {
    console.log("Error Verifying user" + error);
    return Response.json(
      {
        success: false,
        message: "Error checking User",
      },
      {
        status: 500,
      }
    );
  }
}

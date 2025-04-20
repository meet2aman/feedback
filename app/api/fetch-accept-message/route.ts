import { auth } from "@/auth";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return Response.json(
      {
        success: false,
        messgae: "Not authenticated",
      },
      {
        status: 401,
      }
    );
  }
  try {
    const foundUser = await UserModel.findById(session.user._id);
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          messgae: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser?.isAcceptingMessage,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(`Error in getting message acceptance status: ${error}`);
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status",
      },
      { status: 500 }
    );
  }
}

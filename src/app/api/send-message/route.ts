import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
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
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          messgae: "User is not accepting the messages",
        },
        {
          status: 403,
        }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        messgae: "Message sent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("Error in adding messages:" + error);
    return Response.json(
      {
        success: false,
        messgae: "Error adding messages",
      },
      {
        status: 401,
      }
    );
  }
}

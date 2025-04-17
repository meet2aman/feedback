import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
// import { User, getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/options";

export async function DELETE(request: Request) {
  const { userId, messageId } = await request.json();

  console.log(messageId, userId);
  await dbConnect();

  if (!messageId && !userId) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      {
        status: 400,
      }
    );
  }
  try {
    const updatedResult = await UserModel.updateOne(
      { _id: userId },
      { $pull: { messages: { _id: messageId } } }
    );
    if (updatedResult.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message Delete successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(`Error in deleting message: ${error}`);
    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 400,
      }
    );
  }
}

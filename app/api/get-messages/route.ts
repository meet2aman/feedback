import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import mongoose from "mongoose";
import { auth } from "@/auth";

export async function GET(request: any) {
  await dbConnect();

  console.log(request);
  // const userId = await request.params.userId;
  const session = await auth();

  console.log(session?.user.username);

  if (!session?.user.username) {
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
  const parsedUserId = new mongoose.Types.ObjectId(session?.user._id);
  console.log(parsedUserId);
  try {
    const user = await UserModel.aggregate([
      {
        $match: {
          _id: parsedUserId,
        },
      },
      {
        $unwind: "$messages",
      },
      { $sort: { "messages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          messgae: "No Message available",
        },
        {
          status: 201,
        }
      );
    }
    return Response.json(
      {
        success: true,
        messages: user[0].messages,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        messgae: "No messages found",
      },
      {
        status: 401,
      }
    );
  }
}

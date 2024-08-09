import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import mongoose from "mongoose";
export async function POST(request: Request) {
  await dbConnect();
  // const { userId } = await request.json();
  // console.log(userId);
  const userId = "66b64631a9f1588f613b7eac";

  if (!userId) {
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
  const parsedUserId = new mongoose.Types.ObjectId(userId);
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
          messgae: "User not found",
        },
        {
          status: 401,
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

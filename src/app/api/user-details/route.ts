import { NextRequest } from "next/server";
import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const GET = async (request: NextRequest) => {
  await dbConnect();
  try {
    const userFromToken = await getDataFromToken(request);
    const user = await UserModel.findOne({ _id: userFromToken.id }).select(
      "-password -createdAt -updatedAt -verifyCode -verifyCodeExpiry -__v"
    );
    return Response.json(
      {
        message: "user found",
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return Response.json(
      {
        message: error.message || "Error while fetching current user details",
        success: false,
      },
      { status: 400 }
    );
  }
};

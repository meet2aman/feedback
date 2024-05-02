import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export const GET = async (request: NextRequest) => {
  await dbConnect();
  try {
    const userFromToken = await getDataFromToken(request);
    console.log(`userID :: ${userFromToken.id}`);
    const user = await UserModel.findOne({ _id: userFromToken.id }).select(
      "-password -createdAt -updatedAt"
    );
    console.log(`user :: ${user}`);

    return Response.json({
      message: "user found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};

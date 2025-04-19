// app/api/refresh-token/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import dbConnect from "@/db/dbConfig";
import { auth } from "@/auth";

export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const userIsExisted = await UserModel.findById(session.user._id).select(
    "_id username email avatarUrl googleId githubId"
  );
  console.log("usser from /me");

  console.log("userIsExisted", userIsExisted);

  if (!userIsExisted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(
    { messgae: "User Details Fetched Successfully", data: userIsExisted },
    { status: 200 }
  );
}

// app/api/refresh-token/route.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import UserModel from "@/models/User";
import dbConnect from "@/db/dbConfig";
import Session, { User } from "next-auth";

export async function GET(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  console.log(token);

  if (!token?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  await dbConnect();
  const user = (await UserModel.findOne({ email: token.email })) as User;
  console.log("usser from /me");

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
      isVerified: user.isVerified,
      isAcceptingMessages: user.isAcceptingMessages,
    },
  });
}

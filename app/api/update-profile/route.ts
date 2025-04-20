import dbConnect from "@/db/dbConfig";
import { auth } from "@/auth";
import UserModel from "@/models/User";
import { redirect } from "next/navigation";

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { avatarUrl } = await req.json();

  try {
    await dbConnect();
    const response = await UserModel.findByIdAndUpdate(
      session.user._id,
      { avatarUrl },
      { new: true }
    );
    console.log(response);
    return Response.json(
      { sucess: true, message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch {
    return Response.json(
      { success: true, message: "Error updating profile" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    await dbConnect();
    await UserModel.findByIdAndDelete(session.user._id);
    new Response("Profile deleted successfully", { status: 200 });
    redirect("/");
  } catch {
    return new Response("Error deleting profile", { status: 500 });
  }
}

import dbConnect from "@/db/dbConfig";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  const reqBody = await request.json();
  console.log(reqBody);
  const { acceptMessages, userId } = reqBody;
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

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      { new: true }
    );
    if (!updatedUser) {
      console.log("No user found");
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 401,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(`Failed to update user status to accept messages: ${error}`);
    return Response.json(
      {
        success: false,
        message: "failed to update user status to accept messages",
      },
      { status: 500 }
    );
  }
}

// export async function GET(request: any) {
//   await dbConnect();
//   console.log("entered");
//   const url = new URL(request.url);
//   const userId = url.searchParams.get("userId");
//   const userId = request.query.userId;

//   if (!userId) {
//     return Response.json(
//       {
//         success: false,
//         messgae: "Not authenticated",
//       },
//       {
//         status: 401,
//       }
//     );
//   }

//   try {
//     const foundUser = await UserModel.findById(userId);
//     if (!foundUser) {
//       return Response.json(
//         {
//           success: false,
//           messgae: "User not found",
//         },
//         {
//           status: 404,
//         }
//       );
//     }
//     return Response.json(
//       {
//         success: true,
//         isAcceptingMessages: foundUser?.isAcceptingMessage,
//       },
//       {
//         status: 200,
//       }
//     );
//   } catch (error: any) {
//     console.log(`Error in getting message acceptance status: ${error}`);
//     return Response.json(
//       {
//         success: false,
//         message: "Error in getting message acceptance status",
//       },
//       { status: 500 }
//     );
//   }
// }

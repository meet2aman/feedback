// // types/next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       email: string;
//       _id: string;
//       username: string;
//       isVerified: boolean;
//       isAcceptingMessages: boolean;
//       avatarUrl?: string;
//     };
//   }

//   interface User {
//     _id: string;
//     email: string;
//     username: string;
//     isVerified: boolean;
//     isAcceptingMessage: boolean;
//     avatarUrl?: string;
//   }

//   interface JWT {
//     _id: string;
//     email: string;
//     username: string;
//     avatarUrl?: string;
//     isVerified: boolean;
//     isAcceptingMessages: boolean;
//   }
// }

// declare type SessionType = {
//   email: string;
//   name?: string;
//   _id: string;
//   isVerified: boolean;
//   isAcceptingMessages: boolean;
//   username: string;
//   avatarUrl?: string;
// };

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      username: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
      avatarUrl?: string;
      name?: string;
      image?: string;
    };
  }

  interface User {
    _id: string;
    email: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    avatarUrl?: string;
    name?: string;
    image?: string;
  }

  interface JWT {
    _id: string;
    email: string;
    username: string;
    avatarUrl?: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    name?: string;
    image?: string;
  }
}


export type SessionType = {
  _id: string;
  email: string;
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  avatarUrl?: string;
  name?: string;
  image?: string;
};

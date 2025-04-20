import bcrypt from "bcryptjs";
import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";
import dbConnect from "./db/dbConfig";
import UserModel from "./models/User";
import { User } from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    Google,
    Apple,
    Credentials({
      credentials: {
        identifier: { name: "identifier", type: "text" },
        password: { name: "password", type: "password" },
      },
      authorize: async (credentials): Promise<any> => {
        const identifier = credentials.identifier as string | undefined;
        const password = credentials.password as string | undefined;

        try {
          if (!identifier || !password) throw new Error("Invalid Credentials");
          await dbConnect();
          const user = await UserModel.findOne({
            $or: [
              { email: credentials?.identifier },
              { username: credentials?.identifier },
            ],
          });
          if (!user) throw new Error("Invalid Credentials");
          if (user.googleId !== null)
            throw new Error("Account associated with google");
          if (user.githubId !== null)
            throw new Error("Account associated with github");
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            throw new Error("Invalid Password");
          }

          return user as User;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }: any) => {
      ///  Credentials provider ///
      if (account?.provider === "credentials") return true;

      ///  Google provider ///
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          const sanitizedName = name.replace(/\s+/g, "");
          await dbConnect();
          const isAlreadyExist = await UserModel.findOne({
            email,
          });

          if (!isAlreadyExist) {
            const newUser = await UserModel.create({
              email,
              avatarUrl: image,
              username: sanitizedName,
              googleId: id,
              isVerified: true,
            });
            user._id = newUser._id;

            user.username = newUser.username;
            user.avatarUrl = newUser.avatarUrl;
            return true;
          }
          user._id = isAlreadyExist._id;
          user.username = isAlreadyExist.username;
          user.avatarUrl = isAlreadyExist.avatarUrl;
          user.isVerified = isAlreadyExist.isVerified;
          user.isAcceptingMessages = isAlreadyExist.isAcceptingMessage;
          return true;
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      }

      ///  Github provider ///
      if (account?.provider === "github") {
        try {
          const { login } = profile;
          const { email, image, id } = user;
          const sanitizedName = login.replace(/\s+/g, "");

          await dbConnect();
          const isAlreadyExist = await UserModel.findOne({ email });

          if (!isAlreadyExist) {
            const newUser = await UserModel.create({
              email,
              avatarUrl: image,
              username: sanitizedName,
              githubId: id,
              isVerified: true,
            });
            user._id = newUser._id;
            user.username = newUser.username;
            user.avatarUrl = newUser.avatarUrl;
            return true;
          }
          user._id = isAlreadyExist._id;
          user.username = isAlreadyExist.username;
          user.avatarUrl = isAlreadyExist.avatarUrl;
          user.isVerified = isAlreadyExist.isVerified;
          user.isAcceptingMessages = isAlreadyExist.isAcceptingMessage;
          return true;
        } catch (error) {
          throw new AuthError("Error while creating user");
        }
      }

      ///  Apple provider ///
      if (account?.provider === "apple") {
        return true;
      }

      return false;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user?._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.avatarUrl = user.avatarUrl;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.avatarUrl = token.avatarUrl;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.AUTH_SECRET,
});

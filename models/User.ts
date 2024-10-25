import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
  content: string;
  createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export interface User extends Document {
  googleId: string;
  githubId: string;
  avatarUrl: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isAcceptingMessage: boolean;
  messages: Message[];
  forgotPasswordToken: string | undefined;
  forgotPasswordTokenExpiry: Date | undefined;
}

const UserSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    googleId: {
      type: String,
      default: null,
      unique: true,
    },
    githubId: {
      type: String,
      default: null,
      unique: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      default: null,
    },
    verifyCode: {
      type: String,
      // required: [true, "VerifyCode is required"],
    },
    verifyCodeExpiry: {
      type: Date,
      // required: [true, "Verify code Expiry is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAcceptingMessage: {
      type: Boolean,
      default: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const UserModel =
  (mongoose.models?.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;

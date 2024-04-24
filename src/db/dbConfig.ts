import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: Number;
};

const connection: ConnectionObject = {};
async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connection established");
  } catch (error: any) {
    console.log("Database connection falied: " + error.message);
    process.exit(1);
  }
}

export default dbConnect;

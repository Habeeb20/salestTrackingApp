
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async (): Promise<void> => {
  try {
    const mongoUrl: string | undefined = process.env.MONGO_URI;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    const connectdb = await mongoose.connect(mongoUrl);
    if (!connectdb) {
      console.log("could not connect to database");
      return;
    }
    console.log("successfully connected to the database");
  } catch (error: unknown) {
    console.error("an error occurred:", error);
  }
};

export default connectDb;

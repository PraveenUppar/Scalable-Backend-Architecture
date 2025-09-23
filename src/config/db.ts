import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Server connected to MongoDB ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB " + error.message);
    } else {
      console.error("Unknown error connecting to MongoDB");
    }
    process.exit(1);
  }
};

export default connectDB;

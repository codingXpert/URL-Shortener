import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let dbUrl;
    if (process.env.NODE_ENV === "production") {
      dbUrl = process.env.PROD_DATABASE;
    } else if (process.env.NODE_ENV === "development") {
      dbUrl = process.env.LOCAL_DATABASE;
    } else {
      throw new Error("Environment not set properly");
    }
    const connection = await mongoose.connect(dbUrl);
    console.log(`connected to mongoDb ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Error while connecting to DB", error);
  }
};

export default connectDB();

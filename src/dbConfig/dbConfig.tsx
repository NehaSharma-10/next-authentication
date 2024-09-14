import mongoose from "mongoose";
export async function connect() {
  try {
    mongoose.connect(process.env.mongoDB_URL!);
    const connection = mongoose.connection;
    connection.on("connection", () => {
      console.log("MongoDB connected Successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error, Please mongodb is running" + err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong. Check the database connection");
    console.log(error);
  }
}

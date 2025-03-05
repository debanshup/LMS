import mongoose from "mongoose";
process.loadEnvFile("../../.env");
export async function connect() {
  try {
    const uri = process.env.DB_URI || "";
    // console.log("uri "+uri);

    if (await mongoose.connect(uri)) {
      console.log("DB connected successfully");
    }

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log(error.message);
  }
}

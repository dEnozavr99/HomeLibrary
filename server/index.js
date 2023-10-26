import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./routes/books.js";
import Grid from "gridfs-stream";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log('Error while connecting to DB', error);
  })
}
app.use(express.json())
app.use("/api/books", bookRoutes)

app.use((error, request, response, next) => {
  console.error(error.message);

  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  return response
    .status(status)
    .json({
      success: false,
      status,
      message
    })
})

app.listen(8800, () => {
  connect()
  console.log('Connected to Server');
})
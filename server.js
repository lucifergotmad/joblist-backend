import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);

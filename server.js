import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/jobs", userRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);

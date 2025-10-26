import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" })); // Extract JSON Data out of body
app.use(express.urlencoded({ extended: true })); // optional but good

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("*");
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

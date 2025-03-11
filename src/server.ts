import express from "express";
import "dotenv/config.js";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/ProjectRoutes";

// Connect to MongoDB database
connectDB();

const server = express();

server.use(express.json());

// Define routes
server.use("/api/projects", projectRoutes);

export default server;

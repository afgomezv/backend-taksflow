import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config.js";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/ProjectRoutes";
import { corsConfig } from "./config/cors";

// Connect to MongoDB database
connectDB();

const server = express();

server.use(cors(corsConfig));

server.use(morgan("dev"));

server.use(express.json());

// Define routes
server.use("/api/projects", projectRoutes);

export default server;

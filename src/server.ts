import express from "express";
import "dotenv/config.js";
import { connectDB } from "./config/db";

// Connect to MongoDB database
connectDB();

const server = express();

// Define routes
server.get("/", (req, res) => {
  res.send("Desde GET");
});

server.post("/", (req, res) => {
  res.send("Desde POST");
});

server.put("/", (req, res) => {
  res.send("Desde PUT");
});

server.patch("/", (req, res) => {
  res.send("Desde PATCH");
});

server.delete("/", (req, res) => {
  res.send("Desde DELETE");
});

export default server;

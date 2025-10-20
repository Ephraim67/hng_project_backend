require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "error",
    message: "Too many requests from this IP, please try again later",
  },
});
app.use(limiter);

// environment validation
const requiredEnv = ["USER_EMAIL", "USER_NAME", "USER_STACK"];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
});

// Routes
app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });

    const data = {
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: response.data.fact,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching cat fact:", error.message);

    res.status(200).json({
      status: "success",
      user: {
        email: process.env.USER_EMAIL,
        name: process.env.USER_NAME,
        stack: process.env.USER_STACK,
      },
      timestamp: new Date().toISOString(),
      fact: "Cat fact unavailable at the moment.",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is healthy",
    uptime: process.uptime(),
  });
});

// error handler middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ status: "error", message: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`rServer running on port ${PORT}`));

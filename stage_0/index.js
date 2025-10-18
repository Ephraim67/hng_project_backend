require("dotenv").config();
const express = require("express");
const rateLimit = require('express-rate-limit');
const morgan = require("morgan");
const axios = require("axios");
const cors = require("cors");
const app = express();

//Middleware
app.use(cors());
app.use(morgan("combined"))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        status: "error",
        message: "Too many requests from this IP, please try again later"
    }
});

app.use(limiter)

app.get("/me", async (req, res) => {
    try {
        const response = await axios.get("https://catfact.ninja/fact", { timeout: 5000 });

        const data = {
            status: "success",
            user: {
                email: process.env.USER_EMAIL,
                name: process.env.USER_NAME,
                stack: process.env.USER_STACK
            },

            timeStamp: new Date().toISOString(),
            fact: response.data.fact
        };

        res.status(200).type("application/json").json(data);
    } catch (error) {
        console.log("Error fetching cat fact:", error.message)
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGINS || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", require("./routes/post.routes"));
app.use("/user", require("./routes/user.routes"));

connectDB()
  .then(() => {
    app.listen(port, () => console.log("listening on port " + port));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exitCode = 1;
  });

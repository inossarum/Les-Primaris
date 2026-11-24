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

// The legacy Mongo routes have no server-side authentication or ownership
// checks. The React application no longer calls them, so fail closed until
// Firebase ID-token verification and per-resource authorization are added.
app.use(["/post", "/user"], (req, res) => {
  return res.status(503).json({
    message: "Cette API est désactivée jusqu'à la mise en place de contrôles d'accès.",
  });
});

app.use((req, res) => {
  res.status(404).json({message: "Route introuvable"});
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.name === "ValidationError" || err.name === "CastError"
    ? 400
    : 500;
  return res.status(status).json({message: "Une erreur serveur est survenue"});
});

connectDB()
  .then(() => {
    app.listen(port, () => console.log("listening on port " + port));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exitCode = 1;
  });

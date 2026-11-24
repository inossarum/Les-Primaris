const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const cors = require("cors");
const port = 5000;

//  Connection à la DB
connectDB();

const app = express();

//Autorisation CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// middleware qui permet de traiter les données de la "request"
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/post", require("./routes/post.routes"));
app.use("/user", require("./routes/user.routes"));

// Lancer le serveur
app.listen(port, () => console.log("listening on port " + port));

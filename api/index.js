const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dashboardRoute = require("./routes");
const cors = require("cors");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

app.use(express.json());
app.use(
  cors({
    origin: ["https://65c25e7f96121e0c12eb7e24--lucent-squirrel-e2db1c.netlify.app/"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
    res.json("Hello from root!");
});

app.use("/", dashboardRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  connect();
  console.log(`Backend is running on port ${port}`);
});


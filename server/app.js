const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/files");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);


mongoose.connect("mongodb://localhost:27017/datastorage")
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch((err) => console.error(err));

  app.get("/", (req, res) => {
  res.send("API server is running ✅");
});

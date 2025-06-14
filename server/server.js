const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors({
  origin: 'https://my-personal-file-ptilwzjk5-ruthuls-projects.vercel.app',
  credentials: true
}));
app.use(express.json());

mongoose.connect("mongodb+srv://Ruthul:Ruthul1234@cluster0.qpx6zig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error: ", err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const fileRoutes = require("./routes/files");

app.use("/api/files", fileRoutes);
app.use("/uploads", express.static("uploads"));


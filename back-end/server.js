require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Atlas Connection (IPv4 forced)
mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Atlas Connected 🚀"))
  .catch(err=>console.log(err));

// Routes
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} 🔥`)
);


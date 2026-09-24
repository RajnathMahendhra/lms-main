const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const courseRoute = require("./routes/courseRoute");
const authRoute = require("./routes/authRoutes");

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://lmsvhs.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true
}));


app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/courses", courseRoute);

connectDB();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
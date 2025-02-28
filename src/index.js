import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { signup } from "./controllers/signup.controller.js";
import { login } from "./controllers/login.controller.js";
import { getUserProfile } from "./controllers/profile.controller.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import { becomeAPro } from "./controllers/becomeAPro.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://pr-24.d3fzj4oag4giy.amplifyapp.com",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post("/signup", signup);
app.post("/login", login);
app.get("/profile", authenticateUser, getUserProfile);
app.post("/become-a-pro", becomeAPro);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

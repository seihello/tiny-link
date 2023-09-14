import express from "express";
import { newUser, postLogin } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.render("login"); // This will render the urls.ejs file
});

authRouter.post("/login", (req, res) => {
  postLogin(req, res);
});

authRouter.get("/register", (req, res) => {
  res.render("register"); // This will render the urls.ejs file
});

authRouter.post("/register", newUser);

export default authRouter;

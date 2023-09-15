import express from "express";
import { newUser, postLogin, postLogout } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.render("login");
});

authRouter.post("/login", (req, res) => {
  postLogin(req, res);
});

authRouter.post("/logout", (req, res) => {
  postLogout(req, res);
});

authRouter.get("/register", (req, res) => {
  res.render("register"); // This will render the urls.ejs file
});

authRouter.post("/register", newUser);

export default authRouter;

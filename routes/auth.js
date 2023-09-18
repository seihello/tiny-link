import express from "express";
import { newUser, postLogin, postLogout } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/register", (req, res) => {
  res.render("register"); // This will render the urls.ejs file
});

authRouter.post("/register", newUser);

authRouter.get("/login", (req, res) => {
  res.render("login");
});

authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);

export default authRouter;

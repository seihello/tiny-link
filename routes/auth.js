import express from "express";
import {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  postLogout
} from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get("/signup", getSignup);
authRouter.post("/signup", postSignup);

authRouter.get("/login", getLogin);
authRouter.post("/login", postLogin);

authRouter.post("/logout", postLogout);

export default authRouter;

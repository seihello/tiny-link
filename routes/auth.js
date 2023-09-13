import express from "express";
const authRouter = express.Router();

authRouter.get("/login", (req, res) => {
  res.render("login"); // This will render the urls.ejs file
});

authRouter.post("/login", (req, res) => {
  console.log("receive post login");
});

authRouter.get("/register", (req, res) => {
  res.render("register"); // This will render the urls.ejs file
});

export default authRouter;

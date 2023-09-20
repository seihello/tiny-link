import express from "express";
import {
  getPage,
  getNew,
  getId,
  getDeleteId,
  getUrls,
  postId,
  postNew
} from "../controllers/urls.js";

const urlsRouter = express.Router();

urlsRouter.use((req, res, next) => {
  if (req.session?.login) {
    next();
  } else {
    res.redirect("/login");
  }
});

urlsRouter.get("/", getUrls);
urlsRouter.get("/u/:id", getPage);
urlsRouter.post("/new", postNew);
urlsRouter.get("/new", getNew);
urlsRouter.get("/:id", getId);
urlsRouter.get("/:id/delete", getDeleteId);
urlsRouter.post("/:id", postId);

export default urlsRouter;

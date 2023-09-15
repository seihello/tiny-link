import express from "express";
import path from "path";
const server = express();

import urlsRouter from "./routes/urls.js";
import authRouter from "./routes/auth.js";

import cookieSession from "cookie-session";

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "views"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

server.use("/urls", urlsRouter);

server.use("/", authRouter);

server.get("/", (req, res) => {
  res.render("home");
});

export default server;

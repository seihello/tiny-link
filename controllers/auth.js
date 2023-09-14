import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

let users = {};

// auth functions
export const postLogin = (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);

  users = readUsers();

  if(getUser(req.body.email)) {
    if(isPasswordValid(req.body.email, req.body.password)) {
      res.redirect("urls");
    } else {
      console.log("password incorrect");
    }
  } else {
    res.status(403).send("this email is not registered");
  }
}

function getUser(email) {
  const user = Object.values(users).find(user => {
    return user.email === email;
  });

  return user;
}

function isPasswordValid(email, password) {
  return true;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to read the URLs from the file
const readUsers = () => {
  const data = fs.readFileSync(
    path.join(__dirname, "../models/users.json"), "utf8"
  );

  return JSON.parse(data);
};
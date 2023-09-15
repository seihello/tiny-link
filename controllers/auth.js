import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import users from "../models/users.json" assert { type: "json" };

const newUser = (req, res) => {
  const receivedMail = req.body.email;
  const receivedName = req.body.name;
  const receivedPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const id = uuidv4();

  const checkUsers = readUsers();

  const users = Object.values(checkUsers);

  const checkEmail = users.some((user) => user.email === receivedMail);

  if (checkEmail) {
    return res.status(400).send("Email already exists. Please choose a different email.");
  }

  if (receivedPassword !== confirmPassword) {
    return res.status(400).send("Passwords do not match. Please try again.");
  }

  const newUserObject = {
    id: id,
    name: receivedName,
    email: receivedMail,
    password: receivedPassword,
  };

  checkUsers[id] = newUserObject;

  fs.writeFileSync("models/users.json", JSON.stringify(checkUsers, null, 2));

  res.redirect("/");
};
export {newUser};

// auth functions
export const postLogin = (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);

  const user = getUser(req.body.email);
  if(user) {
    if(isPasswordValid(user, req.body.password)) {
      req.session.login = true;
      res.redirect("urls");
    } else {
      res.status(401).send("password is incorrect");
    }
  } else {
    res.status(401).send("this email is not registered");
  }
}

function getUser(email, users) {
  const resisteredUsers = readUsers();
  const user = Object.values(resisteredUsers).find(user => {
    return user.email === email;
  });

  return user;
}

function isPasswordValid(user, password) {
  return user.password === password;
}

export function postLogout(req, res) {
  req.session = null;
  res.render("login");
  console.log("aaaa");
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



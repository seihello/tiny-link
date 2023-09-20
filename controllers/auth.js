import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

import bcrypt from 'bcrypt';

const saltRounds = 2; 

export const postSignup = (req, res) => {
  const receivedMail = req.body.email;
  const receivedName = req.body.name;
  const receivedPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (!receivedMail || !receivedPassword) {
    return res.render("signup", { emailErrorMessage: "Email and password are required." });
  }

  const checkUsers = readUsers();

  const users = Object.values(checkUsers);
  const existingUser = users.find((user) => user.email === receivedMail);

  if (existingUser) {
    return res.render("signup", { emailErrorMessage: "Email already exists. Please choose a different email." });
  }
  

  if (receivedPassword !== confirmPassword) {
    return res.render("signup", { passwordErrorMessage: "Passwords do not match. Please try again." });
  }

  const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.test(receivedPassword)) {
    return res.render("signup", { passwordErrorMessage: "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and one special character." });
  }

  const id = uuidv4();

  bcrypt.hash(receivedPassword, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).send("Error encrypting password.");
    }

    const newUserObject = {
      id: id,
      name: receivedName,
      email: receivedMail,
      password: hash,
    };

    checkUsers[id] = newUserObject;

    fs.writeFileSync("models/users.json", JSON.stringify(checkUsers, null, 2));

    req.session.login = true;
    req.session.userId = id;

    res.redirect("/urls");
    res.render("signup", { emailErrorMessage: null });
  });
};


// auth functions
export const postLogin = (req, res) => {

  const user = getUser(req.body.email);
  if(user) {
    if(isPasswordValid(user, req.body.password)) {
      req.session.login = true;
      req.session.userId = user.id;
      res.redirect("urls");
    } else {
      res.render("login", {passwordErrorMessage: "Incorrect password. Please try again."});
    }
  } else {
    res.render("login", {emailErrorMessage: "This user does not exist. Please try again."});
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
  return bcrypt.compareSync(password, user.password);
}

export function postLogout(req, res) {
  req.session.login = null;
  req.session.userId = null;
  res.redirect("login");
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

export function getEmail(userId) {
  const resisteredUsers = readUsers();
  if(resisteredUsers[userId]) {
    return resisteredUsers[userId].email;
  } else {
    return "";
  }
}

export const getLogin = (req, res) => {
  res.render("login");
}

export const getSignup = (req, res) => {
  res.render("signup");
}


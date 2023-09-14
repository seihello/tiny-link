import { v4 as uuidv4 } from "uuid";
import users from "../models/users.json" assert { type: "json" };
import fs from 'fs';

const newUser = async (req, res, next) => {
  const receivedMail = req.body.email;
  const receivedName = req.body.name;
  const receivedPassword = req.body.password;
  const id = uuidv4();

  users[id] = {
    id: id,
    name: receivedName,
    email: receivedMail,
    password: receivedPassword,
  };

  const updatedUsers = { ...users };

  fs.writeFileSync("models/users.json", JSON.stringify(updatedUsers, null, 2));

  res.redirect("/");
};

export {newUser};



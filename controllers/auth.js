// auth functions
export const postLogin = (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  if(userExists(req.body.email)) {
    if(isPasswordValid(req.body.email, req.body.password)) {
      res.redirect("urls");
    }
  }
}

function userExists(email) {
  return true;
}

function isPasswordValid(email, password) {
  return true;
}
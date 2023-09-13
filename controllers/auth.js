// auth functions
export const postLogin = (req, res) => {
  if(userExists(req.body.userId)) {
    if(isPasswordValid(req.body.userId, req.body.password)) {
      res.redirect("urls");
    }
  }
}

function userExists(userId) {
  return true;
}

function isPasswordValid(userId, password) {
  return true;
}
const express = require("express");
const router = express.Router();
const { salt } = require("../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../utils");

router.post("/", (req, res) => {
  const { users } = req;
  const { email, password } = req.body;

  const user = users.find((user) => {
    return user.email === email && user.password === sha256(password + salt);
  });

  if (!user) {
    res.send({ status: 0, reason: "User/password combo was not found!" });
    return;
  }

  const token = getRandom();
  user.token
    ? user.token.push({ token, issueDate: Date.now() })
    : (user.token = [{ token, issueDate: Date.now() }]);
  res.send({ status: 1, token });
});

module.exports = router;

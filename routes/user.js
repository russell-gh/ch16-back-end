const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", (req, res) => {
  const { users, body } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  password = sha256(password + "ch16-back-end");

  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }

  //do the magic
  req.users.push({ email, password });
  res.send({ status: 1 });
});

module.exports = router;

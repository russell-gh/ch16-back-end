const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");

router.patch("/:id", (req, res) => {
  const { email, password } = req.body;
  let { id } = req.params;
  const { users } = req;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }
  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the id" });
  }

  //the magic
  if (email) {
    users[indexOf].email = email;
  }
  if (password) {
    users[indexOf].password = sha256(password + salt);
  }

  res.send({ status: 1 });
});

router.patch("/append/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  //the magic
  const indexOf = getUserIndexOfById(users, id);

  users[indexOf].newData = req.body;
  res.send({ status: 1 });
});

module.exports = router;

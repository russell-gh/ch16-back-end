const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");

router.post("/", (req, res) => {
  let { users, body, lastUserId } = req;
  let { email, password } = body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  password = sha256(password + salt);

  const user = getUser(users, email, password);

  if (user) {
    res.send({ status: 0, reason: "Duplicate account" });
    return;
  }

  //do the magic - make it look like loads of customers
  lastUserId.value += Math.floor(Math.random() * 9) + 1;
  req.users.push({ email, password, id: lastUserId.value });
  res.send({ status: 1, id: lastUserId.value });
});

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

router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

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
  res.send({ status: 1, user: users[indexOf] });
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  const { users } = req;

  id = Number(id);

  if (!id || Number.isNaN(id)) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  const indexOf = getUserIndexOfById(users, id);

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the id" });
  }

  //the magic can now happen
  users.splice(indexOf, 1);
  res.send({ status: 1 });
});

module.exports = router;

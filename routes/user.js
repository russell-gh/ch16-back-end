const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", (req, res) => {
  let { users, body, lastUserId } = req;
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

  //do the magic - make it look like loads of customers
  lastUserId.value += Math.floor(Math.random() * 9) + 1;
  req.users.push({ email, password, id: lastUserId.value });
  res.send({ status: 1, id: lastUserId.value });
});

router.get("/", (req, res) => {
  res.send(req.users);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const { users } = req;

  if (!id || Number.isNaN(Number(id))) {
    res.send({ status: 0, reason: "Missing or invalid ID" });
    return;
  }

  const indexOf = users.findIndex((user) => {
    return user.id === Number(id);
  });

  if (indexOf === -1) {
    res.send({ status: 0, reason: "User not found, check the id" });
  }

  //the magic can now happen
  users.splice(indexOf, 1);
  res.send({ status: 1 });
});

module.exports = router;

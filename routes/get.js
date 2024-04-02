const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");
const { checkIsUser, checkToken } = require("../middleware");

router.get("/", (req, res) => {
  res.send(req.users);
});

router.get("/:id", checkToken, (req, res) => {
  //the magic
  res.send({ status: 1, user: req.authedUser });
});

module.exports = router;

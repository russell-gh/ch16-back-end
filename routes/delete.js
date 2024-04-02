const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");
const { checkToken } = require("../middleware");

router.delete("/:id", checkToken, (req, res) => {
  console.log(req.authedUser);
  delete req.authedUser.email;
  delete req.authedUser.id;
  delete req.authedUser.token;
  delete req.authedUser.password;
  res.send({ status: 1 });
});

module.exports = router;

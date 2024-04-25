const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");
const { checkIsUser } = require("../middleware");
const asyncMySQL = require("../mysql/driver");
const { updateUser } = require("../mysql/queries");

router.patch("/:id", checkIsUser, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  //the magic
  if (email) {
    console.log(updateUser("email", email, req.headers.token));
    asyncMySQL(updateUser("email", email, req.headers.token));
  }
  if (password) {
    asyncMySQL(
      updateUser("password", sha256(password + salt), req.headers.token)
    );
  }

  res.send({ status: 1 });
});

module.exports = router;

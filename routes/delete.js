const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");
const { checkToken, checkIsUser } = require("../middleware");
const asyncMySQL = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries");

router.delete("/:id", checkIsUser, async (req, res) => {
  await asyncMySQL(deleteUser(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;

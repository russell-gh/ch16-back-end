const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { checkIsUser } = require("../middleware");
const asyncMySQL = require("../mysql/driver");
const { getUser } = require("../mysql/queries");

router.get("/:id", checkIsUser, async (req, res) => {
  console.log(req.cookies);

  const results = await asyncMySQL(getUser(req.headers.token));

  //the magic
  res.send({ status: 1, user: results[0] });
});

module.exports = router;

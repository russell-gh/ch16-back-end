const express = require("express");
const { checkToken } = require("../middleware");
const asyncMySQL = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/", checkToken, async (req, res) => {
  await asyncMySQL(deleteToken(req.headers.token));

  res.send({ status: 1 });
});

module.exports = router;

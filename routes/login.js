const express = require("express");
const router = express.Router();
const { salt } = require("../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../utils");
const asyncMySQL = require("../mysql/driver");
const chalk = require("chalk");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + salt);

  console.log(chalk.yellow("sha256 password:", password));

  const sql = `SELECT * FROM users
                WHERE email LIKE ? 
                  AND password LIKE ?;`;

  const results = await asyncMySQL(sql, [email, password]);

  if (results.length === 1) {
    const token = getRandom();

    await asyncMySQL(`INSERT INTO sessions
                          (user_id, token)
                             VALUES
                               (${results[0].id}, "${token}");`);

    res.cookie("token", "hello world");
    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "Bad creds!" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const { salt } = require("../secrets");
const sha256 = require("sha256");
const { getRandom } = require("../utils");
const asyncMySQL = require("../mysql/driver");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  password = sha256(password + salt);

  const results = await asyncMySQL(`SELECT * FROM users
                                      WHERE email LIKE "${email}" 
                                        AND password LIKE "${password}";`);

  if (results.length > 0) {
    const token = getRandom();

    await asyncMySQL(`INSERT INTO sessions
                          (user_id, token)
                             VALUES
                               (${results[0].id}, "${token}");`);

    res.send({ status: 1, token });
    return;
  }

  res.send({ status: 0, reason: "Bad creds!" });
});

module.exports = router;

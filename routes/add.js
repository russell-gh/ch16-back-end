const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getRandom } = require("../utils");
const asyncMySQL = require("../mysql/driver");
const { addUser, addToken } = require("../mysql/queries");
// const { sendEmail } = require("../email/sib");
const { sendEmail } = require("../email/nodemailer");

const { welcomeEmail } = require("../email/templates");

router.post("/", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    res.send({ status: 0, reason: "Missing data" });
  }

  password = sha256(password + salt);

  //why not login at the same time
  const token = getRandom();

  try {
    const result = await asyncMySQL(addUser(email, password));

    await asyncMySQL(addToken(result.insertId, token));

    //send a welcome email
    sendEmail(welcomeEmail(email), undefined, [{ email, name: "Russell" }]);

    res.send({ status: 1, token });
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: "Duplicate users" });
  }
});

module.exports = router;

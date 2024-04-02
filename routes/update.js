const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { salt } = require("../secrets");
const { getUser, getUserIndexOfById } = require("../utils");
const { checkToken } = require("../middleware");

router.patch("/:id", checkToken, (req, res) => {
  const { email, password } = req.body;

  if (!(email || password)) {
    res.send({ status: 1, reason: "Missing any data" });
  }

  //the magic
  if (email) {
    req.authedUser.email = email;
  }
  if (password) {
    req.authedUser.password = sha256(password + salt);
  }

  res.send({ status: 1 });
});

// router.patch("/append/:id", (req, res) => {
//   let { id } = req.params;
//   const { users } = req;

//   id = Number(id);

//   if (!id || Number.isNaN(id)) {
//     res.send({ status: 0, reason: "Missing or invalid ID" });
//     return;
//   }

//   //the magic
//   const indexOf = getUserIndexOfById(users, id);

//   users[indexOf].newData = req.body;
//   res.send({ status: 1 });
// });

module.exports = router;

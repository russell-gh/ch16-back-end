const { getUserIndexOfById } = require("./utils");

function checkIsUser(req, res, next) {
  const user = req.users.find((user) => {
    return req.body.email === user.email;
  });

  if (!user) {
    console.log("User NOT found, quitting");
    res.send({ status: 0, reason: "User unknown" });
    return;
  }

  console.log("User found, carry on");
  next();
}

function checkToken(req, res, next) {
  const user = req.users.find((user) => {
    console.log(user.token);

    return user.token.find((token) => {
      return token.token === req.headers.token;
    });

    //user.token === Number(req.headers.token);
  });

  if (user) {
    req.authedUser = user;
    next();
    return;
  }

  res.send({ status: 0, reason: "Bad token" });
}

module.exports = { checkIsUser, checkToken };

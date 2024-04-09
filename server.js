const express = require("express");
const app = express();
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

//rate limiter
const limiterConfig = rateLimit({
  windowMs: 10000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  //standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  //legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
// app.use(limiterConfig);
//rate limiter

app.use(cors()); //slides in a few weeks about this

//users state
const users = [];
let lastUserId = { value: 1000 };

app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  req.users = users;
  req.lastUserId = lastUserId;
  next();
});

app.use("/user/get", require("./routes/get"));
app.use("/user/add", require("./routes/add"));
app.use("/user/delete", require("./routes/delete"));
app.use("/user/update", require("./routes/update"));
app.use("/user/login", require("./routes/login"));
app.use("/user/logout", require("./routes/logout"));
app.use("/proxy", require("./routes/proxy"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//clean up
setInterval(() => {
  users.forEach((user) => {
    user.token.forEach((token) => {
      if (token.issueDate + 86400000 < Date.now()) {
        delete token.token;
      }
    });
  });
}, 300000);

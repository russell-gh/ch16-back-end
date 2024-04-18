const express = require("express");
const app = express();
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");

//rate limiter
const limiterConfig = rateLimit({
  windowMs: 10000, // 15 minutes
  limit: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  //standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  //legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});
app.use(limiterConfig);
//rate limiter

app.use(cookieParser());

app.use(cors()); //slides in a few weeks about this
app.use(express.json());

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

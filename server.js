const express = require("express");
const app = express();
const cors = require("cors");
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

app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

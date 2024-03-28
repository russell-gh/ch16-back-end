const express = require("express");
const app = express();

//users state
const users = [];

app.use(express.json());

//middleware that adds the users array to the request
app.use(function (req, res, next) {
  req.users = users;
  next();
});

app.use("/user", require("./routes/user"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

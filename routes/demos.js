const exp = require("constants");
const express = require("express");
const router = express.Router();

app.post("/postDemo", (req, res) => {
  console.log("New POST request", req.body);
  res.send(req.body);
});

app.get("/about/:country", (req, res) => {
  switch (req.params.country) {
    case "uk":
      res.send(`<div>
        <h1>UK head office</h1>
        <p>0121 548 9856</p>
        </div>`);

    case "us":
      res.send(`<div>
          <h1>USA head office</h1>
          <p>865 - 586 -589</p>
          </div>`);

    default:
      break;
  }
});

module.export = route;

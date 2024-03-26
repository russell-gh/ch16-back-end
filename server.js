const express = require("express");
const app = express();
const simpsons = require("./simpsons.json");

//add an id to each character
simpsons.forEach((item, index) => {
  item.id = index + 1;
});

//handle request to static files
app.use(express.static("public"));

//handle requests for dynamic data
app.get("/quotes/:count/:character", (request, response) => {
  const { count = 1, character } = request.params;

  //convert url count to a number
  let countAsNumber = Number(count);

  //if not a number, replace with 1
  if (Number.isNaN(countAsNumber) || count < 1) {
    response.send("Sorry, you did not enter a number, or an invalid number");
    // return;
  }

  //check enough results
  if (countAsNumber > simpsons.length) {
    response.send("You asked for too much data");
    // return;
  }

  //passed all validation

  let copy = [...simpsons];

  //random the array
  copy.sort(() => {
    return 0.5 - Math.random();
  });

  if (character) {
    copy = copy.filter((char) => {
      return char.character.toLowerCase().includes(character.toLowerCase());
    });
  }

  //check that the user does not want more than on offer
  copy.length = countAsNumber > copy.length ? copy.length : countAsNumber;

  response.send(copy);
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const router = express.Router();

const simpsons = require("../simpsons.json");

//add an id to each character
simpsons.forEach((item, index) => {
  item.id = index + 1;
});

let downloadCount = 0;

//handle requests for dynamic data
router.get("/quotes/:count/:character", (request, response) => {
  downloadCount++;
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

  response.send({ downloadCount, copy });
});

module.exports = router; //basically export

const express = require("express");
const router = express.Router();
const axios = require("axios");
const { checkToken } = require("../middleware");

router.get("/:searchTerm", checkToken, async (req, res) => {
  console.log(req.ip);
  try {
    const { searchTerm } = req.params;

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ2YjFmOGE4ZmM2ZGJmOGU0YWY0M2U3MzBhNDY2MSIsInN1YiI6IjY0Nzc4OGJhOTM4MjhlMDBiZjljOTkwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PaH_RToi9pI0GJ_K_BtR3PlwJiScoFClmEfUqXuUzo`,
        },
      }
    );

    res.send(data);
  } catch (e) {
    res.send({ status: 0, reason: e });
  }
});

module.exports = router;

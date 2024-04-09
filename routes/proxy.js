const express = require("express");
const router = express.Router();
const axios = require("axios");
const { checkToken } = require("../middleware");
const asyncMySQL = require("../mysql/driver");

router.get("/:searchTerm", async (req, res) => {
  try {
    const { searchTerm } = req.params;

    //check cache
    const cache = await asyncMySQL(
      `SELECT response FROM cache WHERE search_term LIKE "${searchTerm}";`
    );

    //if in the cache, convert to json and send
    if (cache.length) {
      const str = Buffer.from(cache[0].response, "base64");
      res.send(str.toString("utf8"));
      return;
    }

    //not found in cache so get from API
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MGQ2YjFmOGE4ZmM2ZGJmOGU0YWY0M2U3MzBhNDY2MSIsInN1YiI6IjY0Nzc4OGJhOTM4MjhlMDBiZjljOTkwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5PaH_RToi9pI0GJ_K_BtR3PlwJiScoFClmEfUqXuUzo`,
        },
      }
    );

    //convert reply to base 64
    const b64 = Buffer.from(JSON.stringify(data), "utf8");

    //store in database
    await asyncMySQL(`INSERT INTO cache
                          (search_term, response)
                            VALUES
                              ("${searchTerm}", "${b64.toString("base64")}");`);

    //send to user
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send({ status: 0, reason: e });
  }
});

module.exports = router;

const express = require("express");
const route = express.Router();
const Twitter = require("twitter");

var client = new Twitter({
  consumer_key: "sOpTmlgZeX6FjC2dnf2Alnmm7",
  consumer_secret: "8nGgqAi2vEp5s8kW5vW7YLKyNzXr2dntxXSQOnzNmsdTnfZAzp",
  bearer_token:
    "AAAAAAAAAAAAAAAAAAAAAMlUAwEAAAAAZqupaXgkpvP5Xi%2FpJidl%2FwD7FNQ%3DmsWAd4idwzlkHSuTNd7j337T1JflXJWVnbWSz2MqmajQQkPLPv"
});

route.get("/following/:twitterhandle", (req, res) => {
  const following = [];


  client.get(
    "https://api.twitter.com/1.1/friends/list.json",
    { screen_name: req.params.twitterhandle || "realDonaldTrump" },
    function(error, response) {
        console.log(error)
      response.users.forEach(element => {
        following.push({
          screen_name: element.screen_name,
          name: element.name
        });
      });

      res.send(following);
      // response.users.forEach(element => {
      //         followers.push(element.name)
      //         console.log(element.name)
      //     });
    }
  );
});

module.exports = route;

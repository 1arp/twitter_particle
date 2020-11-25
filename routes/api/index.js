const express = require("express");
const route = express.Router();
const Twitter = require("twitter");

var client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET,
  bearer_token: process.env.BEARER_TOKEN
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

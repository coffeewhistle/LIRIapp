require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var nodeSpotifyAPI = require('node-spotify-api');
var request = require('request');

var spotify = new nodeSpotifyAPI(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv;
var action = userInput[2];
var query = userInput[3];
var lineBreak = "---------------------------";

switch (action) {
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThisSong();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
    default:
        break;
}

function myTweets() {
    // This will be where I respond to my-tweets action
    var params = { screen_name: 'groupBRCA' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            // console.log(tweets);
        }
        for (var i = 0; i < tweets.length; i++) {
            var data = tweets[i];
            console.log("User: " + data.user.name);
            console.log("Tweet: " + data.text);
            console.log("Created at: " + data.created_at);
            console.log(lineBreak);
        }
    });
}

function spotifyThisSong() {
    // This is where I will repond to spotify-this-song
    spotify
        .search({ type: 'track', query: query, limit: 3 })
        .then(function (response) {
            console.log(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis() {
    // This is where I will respond to movie-this
    // take the input from 'query'
}

function doWhatItSays() {
    // This is where I will respond to do-what-it-says
    // pull the query info from the random.txt file
}
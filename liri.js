require("dotenv").config();
var fs = require("fs");
var jsonfile = require("jsonfile");
var keys = require("./keys.js");
var Twitter = require('twitter');
var nodeSpotifyAPI = require('node-spotify-api');
var request = require('request');

var spotify = new nodeSpotifyAPI(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv;
var action = userInput[2];
var queryArr = [];
var query;
var lineBreak = "---------------------------";

for (var i = 3; i < userInput.length; i++) {
    queryArr.push(userInput[i]);
    query = queryArr.join(' ');
}

runApp(action);

function runApp(action) {

    switch (action) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            if (query != undefined) {
                spotifyThisSong(query);
            } else {
                defaultSong();
            }
            break;
        case 'movie-this':
            if (query != undefined) {
                movieThis(query);
            } else {
                defaultMovie();
            }
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
        default:
            console.log("Please pick either my-tweets, spotify-this-song, movie-this, do-what-it-says");
            break;
    }
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

function spotifyThisSong(song) {

    // This is where I will repond to spotify-this-song
    spotify
        .search({ type: 'track', query: song, limit: 3 })
        .then(function (response) {
            console.log(lineBreak);
            // Artist name from the first result
            console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
            // The song's name from the first result
            console.log("Track Name: " + response.tracks.items[0].album.name);
            // A preview link of the song from Spotify
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            // The album that the song is from
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log(lineBreak);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis(movie) {
    // This is where I will respond to movie-this
    // take the input from 'query'
    request('https://www.omdbapi.com/?t=' + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (error) {
            console.log(error);
        } else {
            console.log(lineBreak);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log(lineBreak);
        }
    });
}

function doWhatItSays() {
    // This is where I will respond to do-what-it-says
    // pull the query info from the random.txt file
    fs.readFile('random.txt', "utf8", function (err, data) {
        responseArr = data.split(',');
        action = responseArr[0];
        query = responseArr[1];
        runApp(action);
    });
}

function defaultMovie() {
    movieThis("Mr. Nobody");
}

function defaultSong() {
    spotifyThisSong("Say it ain't so");
}
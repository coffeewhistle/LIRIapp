require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput = process.argv;
var action = userInput[2];
var query = userInput[3];

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
}

function spotifyThisSong() {
    // This is where I will repond to spotify-this-song
}

function movieThis() {
    // This is where I will respond to movie-this
    // take the input from 'query'
}

function doWhatItSays() {
    // This is where I will respond to do-what-it-says
    // pull the query info from the random.txt file
}
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api'); //get keys from keys.js
 
var spotify = new Spotify;

var command = process.argv[2];
var input = process.argv[3];

//code
// if("concert-this"

// spotify-this-song

// movie-this

// do-what-it-says
switch(command){
    case "concert-this":
    concertThis(input);
    break;
    case "spotify-this-song":
    spotifyThisSong(input);
    break;
    case "movie-this":
    movieThis(input);
    break;
    case "do-what-it-says":
    doWhatItSays(input);
    break;
};


//bandsintown
// Name of the venue

// Venue location

// Date of the Event (use moment to format this as "MM/DD/YYYY")
//axios
function concertThis(input){
axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function(response) {
    console.log("The venue's name is: " + response.data.venue.name);
    console.log("The venue's location is: " + response.data.venue.city);
    console.log("The date of the event is: " + response.data.datetime);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);

  });
}

//   Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong(input){
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data); 
    });
    }

// Then run a request with axios to the OMDB API with the movie specified
// * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieThis(input){
axios.get("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("The movie's rating is: " + response.data.title);
    console.log("The movie's rating is: " + response.data.year);
    console.log("The movie's rating is: " + response.data.imdbRating);
    console.log("The movie's rating is: " + response.data.ratings.source[1]);
    console.log("The movie's rating is: " + response.data.country);
    console.log("The movie's rating is: " + response.data.language);
    console.log("The movie's rating is: " + response.data.plot);
    console.log("The movie's rating is: " + response.data.actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function doWhatItSays(input){

}
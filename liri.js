require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); //get keys from keys.js
 
var spotify = new Spotify(keys.spotify);

var fs = require("fs"); //LIRI will take the text inside of random.txt 
var axios = require("axios");
var moment = require("moment");
moment().format();


var command = process.argv[2];
var input = process.argv.splice(3).join(" ");

    //code
// concert-this

// spotify-this-song

// movie-this

// do-what-it-says
function run(){
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
}

run();

//bandsintown
// Name of the venue

// Venue location

// Date of the Event (use moment to format this as "MM/DD/YYYY")
//axios
function concertThis(input){
axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
.then(function(response) {
    for( var i = 0; i < response.data.length; i++){
        var datetime = response.data[i].datetime;
        var dateArr = datetime.split("T");
    console.log("The venue's name is: " + response.data[i].venue.name);
    console.log("The venue's location is: " + response.data[i].venue.city);
    console.log("The date of the event is: " + moment().format(dateArr[0], "MM-DD-YYYY"));
    }
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
};

//   Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from

// If no song is provided then your program will default to "The Sign" by Ace of Base.

function spotifyThisSong(input){
    if(!input){
        input = "The Sign";
    }
    spotify.search({ type: 'track', query: input })
    .then(function(response){
           var results = 
            "\nArtist(s):" + response.tracks.items[0].artists[0].name +
            "\nThe song's name:" + response.tracks.items[0].name +
            "\nA preview link of the song from Spotify:" + response.tracks.items[0].preview_url +
            "\nThe album that the song is from:" + response.tracks.items[0].album.name;
            console.log(results);

    })

    .catch(function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data); 
    });
};

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
    if(!input){
        input = "Mr. Nobody";
    }
axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
.then(function(response) {
    console.log("Title of the movie: " + response.data.Title);
    console.log("Year the movie came out: " + response.data.Year);
    console.log("IMDB Rating of the movie: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
    console.log("Country where the movie was produced: " + response.data.Country);
    console.log("Language of the movie: " + response.data.Language);
    console.log("Plot of the movie: " + response.data.Plot);
    console.log("Actors in the movie: " + response.data.Actors);
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

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return console.log(err);
        }else{
        var dataArr = data.split(",");
        command = dataArr[0];
        input = dataArr[1].replace(/"/g, "");
        run();
        }
    })
}
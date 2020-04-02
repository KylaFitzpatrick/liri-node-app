require("dotenv").config();
var keys = require("./keys.js");//requiring js file for spotify
var Spotify = require('node-spotify-api'); //get keys from keys.js
 
var spotify = new Spotify(keys.spotify);

var fs = require("fs"); //LIRI will take the text inside of random.txt 
var axios = require("axios"); //axios required for omdb and bandintown api
var moment = require("moment"); //moment required for logging date format
moment().format();


var command = process.argv[2]; //starting from the second index user will enter command
var input = process.argv.splice(3).join(" "); //starting from the third index user will enter input

function run(){
switch(command){
    case "concert-this": //command
    concertThis(input); //user input artist
    break;
    case "spotify-this-song"://command
    spotifyThisSong(input);//user input song
    break;
    case "movie-this"://command
    movieThis(input);//user input title of movie
    break;
    case "do-what-it-says"://command
    doWhatItSays();//user runs command
    break;
};
}

run();


function concertThis(input){
axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp") //use axios api to request bandsintown and input by user
.then(function(response) {
    for(var i = 0; i < response.data.length; i++){
        var datetime = response.data[i].datetime;
        var dateArr = datetime.split("T");
        var results =
    "\nName of the venue " + response.data[i].venue.name + //name of venue
    "\nVenue location: " + response.data[i].venue.city + //vanue location
    "\nDate of the Event: " + moment().format(dateArr[0], "MM-DD-YYYY")// moment to format date of event as "MM/DD/YYYY"
    console.log(results);
    }
  })
  .catch(function(error) {
    if (error.response) {
        // request return status code from server
        // errors out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
    } else if (error.request) {
        // request and no response was received
        // `error.request` an object with details about error
      console.log(error.request);
    } else {
      // request triggered an error
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
            "\nArtist(s):" + response.tracks.items[0].artists[0].name + //name of artist 
            "\nThe song's name:" + response.tracks.items[0].name + //name of song
            "\nA preview link of the song from Spotify:" + response.tracks.items[0].preview_url + //preview link from spotify
            "\nThe album that the song is from:" + response.tracks.items[0].album.name; //album name
            console.log(results);

    })

    .catch(function (err, data) {
        if (error.response) {
            // request return status code from server
            // errors out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
              // request and no response was received
              // `error.request` an object with details about error
            console.log(error.request);
          } else {
            // request triggered an error
            console.log("Error", error.message);
          }
          console.log(error.config);
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
    var results =
    "\nTitle of the movie: " + response.data.Title + //title of movie
    "\nYear the movie came out: " + response.data.Year + //year movie released
    "\nIMDB Rating of the movie: " + response.data.imdbRating + //imdb rating
    "\nRotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value + //rotten tomatoes rating
    "\nCountry where the movie was produced: " + response.data.Country + //country the movie was produced
    "\nLanguage of the movie: " + response.data.Language + //language of movie
    "\nPlot of the movie: " + response.data.Plot + //plot of the movie
    "\nActors in the movie: " + response.data.Actors //actors in movie
    console.log(results); //log result from results var
  })
  .catch(function(error) {
    if (error.response) {
      // request return status code from server
      // errors out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // request and no response was received
      // `error.request` an object with details about error
      console.log(error.request);
    } else {
      // request triggered an error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}

function doWhatItSays(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if(err){
            return  console.log(err);
        }else{
        var dataArr = data.split(","); //split array on comma
        command = dataArr[0]; //command is the zero index
        input = dataArr[1].replace(/"/g, ""); //input is the first index
        run();
        }
    })
}
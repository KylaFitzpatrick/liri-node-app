# liri-node-app

### Clearly state the problem the app is trying to solve (i.e. what is it doing and why)
LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data from spotify, ombd, bandsintown.
LIRI displays information from these various APIs to give the user more information about the inputs they are searching.

### Give a high-level overview of how the app is organized

LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies as well as reading text from a file to call the various API based on the command. This data will also be logged in a log.txt file everytime the command is ran.

### Give start-to-finish instructions on how to run the app

Run steps 1-4 to display data based on your input for each command:

1. node liri.js concert-this <artist/band name here>

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

Name of the venue

Venue location

Date of the Event (use moment to format this as "MM/DD/YYYY")


2. node liri.js spotify-this-song '<song name here>'

This will show the following information about the song in your terminal/bash window

Artist(s)

The song's name

A preview link of the song from Spotify

The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

3. node liri.js movie-this '<movie name here>'

This will output the following information to your terminal/bash window:

  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.

If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

4. node liri.js do-what-it-says

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

Edit the text in random.txt to test out the feature for movie-this and concert-this.
For example: 
movie-this,"forrest gump"
concert-this,"chvrches"

### Include screenshots, gifs or videos of the app functioning
1. node liri.js concert-this <artist/band name here>

![Alt text](/images/concert-this.png)

2. node liri.js spotify-this-song '<song name here>'

![Alt text](/images/spotify-this-song.png)

3. node liri.js movie-this '<movie name here>'

![Alt text](/images/movie-this.png)

4. node liri.js do-what-it-says

![Alt text](/images/do-what-it-says.png)

![Alt text](/images/do-what-it-says-concert.png)

![Alt text](/images/do-what-it-says-movie.png)

5. The above commands will also log data to log.txt file everytime a command in ran

![Alt text](/images/log_txt.png)

### Contain a link to a deployed version of the app

Repository: https://github.com/KylaFitzpatrick/liri-node-app

### Clearly list the technologies used in the app

I used the following apis: spotfiy, omdb, axios and bandsintown. I also used moment.js to display the date format. 

### State your role in the app development

My role in development was logging data responses from the various apis. 
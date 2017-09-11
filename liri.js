if (process.argv[2] == 'my-tweets') {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.twitter_consumer_key,
        consumer_secret: process.env.twitter_consumer_secret,
        access_token_key: process.env.twitter_access_token_key,
        access_token_secret: process.env.twitter_access_token_secret
    });
    // temp loop to create some random tweets
    /* for (var i = 0; i < 20; i++) {
        var message = "I am a tweet " + i;
        client.post('statuses/update', {
            status: message
        }, function (error, tweet, response) {
            if (!error) {
                console.log(tweet);
            }
        });
    } */
    // Once the request has been sent to the client server to get the information regarding the tweets of a particular user using there screen name , using a callback function the tweets will get displayed on the console.
    client.get('statuses/user_timeline', {
        'screen_name': 'sahanabalram',
        'count': '20'
    }, function (error, tweets, response) {
        if (error) throw error;
        console.log(error);
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text); // The favorites. 
        }
    });
    // code for Spotify
} else if (process.argv[2] == "spotify-this-song") {
    // if a trackname is not specified then the default trackname will get displayed with name of artist, album name.
    var trackname = "The Sign";
    if (process.argv[3] !== undefined) {
        trackname = process.argv[3]
    }
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: process.env.Spotify_Client_ID,
        secret: process.env.Spotify_Client_Secret
    });
    // if a trackname is specified then the name of the artist, album name, preview_url , name of the track will get displayed
    spotify.search({
        type: 'track',
        query: trackname,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            if (trackname === "The Sign") {
                var artists = [];
                for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
                    artists.push(data.tracks.items[i].album.artists[j].name);
                }
                if (artists.join(', ').includes("Ace of Base")) {
                    console.log("---------------------------------------");
                    console.log("Name:" + data.tracks.items[i].name);
                    console.log("Album:" + data.tracks.items[i].album.name);
                    console.log("Preview_URL:" + data.tracks.items[i].preview_url);
                    console.log("Artist Name:" + artists.join(', '));
                }
            } else {
                console.log("---------------------------------------");
                console.log("Name:" + data.tracks.items[i].name);
                console.log("Album Name:" + data.tracks.items[i].album.name);
                console.log("Preview_URL:" + data.tracks.items[i].preview_url);
                var artists = [];
                for (var j = 0; j < data.tracks.items[i].album.artists.length; j++) {
                    artists.push(data.tracks.items[i].album.artists[j].name);
                }
                console.log("Artist Name" + artists.join(', '));
            }
        }
    });
} else if (process.argv[2] == "movie-this") {
    var request = require('request');
    var movieName = "Mr.Nobody";
    if (process.argv[3] !== undefined) {
        movieName = process.argv[3]
    }
    var queryURL = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName;
    console.log(queryURL);

    request(queryURL, function (error, response, body) {

        console.log('error:', error); // Print the error if one occurred 
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 

        // Request response body will be a string and not an object even though it looks like a json object
        // So need to parse the body to JSON to access its members
        var movieData = JSON.parse(body);
        console.log("Title of the Movie:" + movieData.Title);
        console.log("Year of the Movie:" + movieData.Year);
        console.log("IMDB Rating:" + movieData.imdbRating);
        // iterate through the list of Ratings to get the value of ratings from Rotten Tomato 
        for (var i = 0; i < movieData.Ratings.length; i++) {
            if (movieData.Ratings[i].Source === "Rotten Tomatoes") {
                console.log("Rotten Tomatoes:" + movieData.Ratings[i].Value);
            }
        }
        console.log("Country:" + movieData.Country);
        console.log("Language:" + movieData.Language);
        console.log("Plot:" + movieData.Plot);
        console.log("Actors:" + movieData.Actors);


    });

} else if (process.argv[2] == "do-what-it-says") {
    const fs = require('fs');
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
}
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
}
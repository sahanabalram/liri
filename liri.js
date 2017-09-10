if (process.argv[2] == 'my-tweets') {
    var Twitter = require('twitter');

    var client = new Twitter({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token_key: process.env.access_token_key,
        access_token_secret: process.env.access_token_secret
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
    client.get('statuses/user_timeline', {'screen_name': 'sahanabalram', 'count': '20'}, function (error, tweets, response) {
        if (error) throw error;
        console.log(error);
        for(var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text); // The favorites. 
        }       
        //console.log(response); // Raw response object. 
    });
}

var Table = require('cli-table2');

var command = process.argv[2]

var userInput = process.argv.slice(3).join(' ')



var keys = require("./keys.js")


if (command === 'tweet'){
	getTweets()
} else if (command === 'spotify') {
	spotify()
} else if (command === 'omdb'){
	omdb()
} else {
	return "Failed to recognize user input. Please try again."
}


function getTweets() {

	var table = new Table({
  		head: ["Time", "Tweet"],
	});

    var Twitter = require('twitter');

    var client = new Twitter(keys.twitterKeys);

    var params = {
        screen_name: userInput,
        count: '20',
    };

    console.log('"' + params.screen_name + '"')

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            tweets.reverse().forEach(function(value, key) {
                table.push([value.created_at.substring(0, 19), value.text.match(new RegExp('[\\s\\S]{1,54}', 'g')).join("\n")])
            })

            console.log(table.toString());

        } else {

            console.log(error);
        }

    });

}
 




//Spotifuckfy

function spotify() {
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotifyKeys);


    spotify.search({
        type: 'track',
        query: userInput
    }, function(err, data) {


        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var tracks = data.tracks.items[0]


        console.log("Song name: ", tracks.name);
        console.log("Album name: ", tracks.album.name)

        tracks.artists.forEach(function(value, key) {
            console.log("Artist name: ", value.name)
        })

        if (tracks.preview_url !== null) {
            console.log("Preview URL: ", tracks.preview_url)
        }


    });

}




function omdb() {

    var omdb = require('./omdb.js');

    omdb.get({
                title: userInput
            }, true, function(err, movie) {

                if (err) {
                    return console.error(err);
                }

                if (!movie) {
                    return console.log('Movie not found!');
                }

                console.log('%s (%d) %d/10', movie.title, movie.year, movie.imdb.rating);
                console.log(movie.countries.join(", "));
                console.log(movie.actors.join(", "));
                console.log(movie.plot.substring(0, 45) + 
                	"... but wait theres more, but you don't get to read it in the terminal because it's too long");

            });
}



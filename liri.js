    // At the top of the liri.js file, write the code you need to grab the data from keys.js. Then store the keys in a variable.

    // Make it so liri.js can take in one of the following commands:

    // my-tweets

    // spotify-this-song

    // movie-this

    // do-what-it-says

var Table = require('cli-table2');

var table = new Table({
  	head: ["Time", "Tweet"],
  });
  




var keys = require("./keys.js")


var Twitter = require('twitter');
 
var client = new Twitter(keys.twitterKeys);

var user = process.argv[2]
 
var params = {
	q: '@' + user,
	count: '20',
	result_type: 'recent'
};

console.log('"' + params.q + '"')

client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
    tweets.statuses.forEach(function(value, key){
    	table.push([value.created_at.substring(0, 19), value.text.match(new RegExp('[\\s\\S]{1,54}', 'g')).join("\n")])
    	//I preyed to jesus and he told me the way
    })

    console.log(table.toString());

  } else {
  	console.log(error);
  }
});



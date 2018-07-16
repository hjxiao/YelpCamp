var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{name: "South Island", image: "https://i.redditmedia.com/qhCZNzxbyJQgBmVHBxbS3mw1EpgGYgGiMbL0gwXqkec.jpg?w=512&s=218a47ccdfdafde88219081457198576", description: "Beautiful verdant flowers."},
	{name: "Yosemite", image: "https://i.redditmedia.com/CYz3PgZoM8QQQD-A1suwL5UUcGHRnxGhvEoz7_xXHJw.jpg?w=614&s=5bdb2c1db66ccf9f7b247b2b43f11708", description: "Serene wisps calm the mind."},
	{name: "Bavaria", image: "https://i.redditmedia.com/EkBkgEZp5MlpNzUr9NSLFASRKD4lRAqXG_Xj_RSDYco.jpg?w=980&s=191120e57d0cc751a91f44e01db47e37", description: "Snow-powdered broccoli to quench the munchies."}
]

function seedDB() {
	// Remove all campgrounds
	Campground.remove({}, function(err) {
		if (err) {
			console.log(err);
		} 
		console.log("Removed campgrounds.");

		// Add starter campgrounds
		data.forEach(function(item) {
			Campground.create(item, function(err, data) {
				if (err) {
					console.log(err);
				} else {
					console.log("Added item to database");
					Comment.create(
						{
							text: "Awesome place. Wish there was internet.", 
							author: "Homer"
						}, function(err, item) {
							if (err) {
								console.log(err);
							} else {
								data.comments.push(item);
								data.save();
								console.log("Created a new comment");
							}
					});
				}
			});
		});
	});
	// Add starter comments
};

module.exports = seedDB;



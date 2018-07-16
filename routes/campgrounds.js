var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index.js");

// INDEX route - shows all campgrounds
router.get("/campgrounds", function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds, currentUser: req.user});
		}
	});
});

// CREATE route - adds a new campground to database
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
	var name = req.body.name;
	var image = req.body.url;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newSite = {name: name, image: image, description: desc, author: author};
	Campground.create(newSite, function(err, newlyCreated) {
		if (err) {
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// NEW route - shows the form to create a campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
	res.render("campgrounds/new");
});

// SHOW route - shows information about 1 particular campground
router.get("/campgrounds/:id", function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundSite) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground: foundSite});
		}
	});
});

// EDIT route - shows the form to edit an existing campground
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	// executing this code means we have succcessfully verified ownership	
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render("campgrounds/edit", {campground: foundCampground});
	});
});


// UPDATE route - the path to submit information to update a campground
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// DESTROY route - deletes a campground
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if (err) {
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds");
		}
	});
});


module.exports = router;

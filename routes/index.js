var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// setting up basic routes
router.get("/", function(req, res) {
	res.render("landing");
});

// AUTH ROUTES

// show register forms
router.get("/register", function(req, res) {
	res.render("register");
});

// handle sign-up logic
router.post("/register", function(req, res) {
	var newUser = {username: req.body.username};
	// Create a new user in DB with username, but pass the PW separately
	// so that PASSPORT can hash it. The parameter, user, in the callback
	// will be returned if registration is successful. 
	User.register(newUser, req.body.password, function(err, user) {
		if (err) {
			req.flash("error", err.message);
			return res.render("register");
		} 
		passport.authenticate("local")(req, res, function() {
			req.flash("success", "Welcome to YelpCamp, " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

// handling login logic
router.get("/login", function(req, res) {
	res.render("login");
});

// show login form
router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}),function(req, res) {
});

// logout route
router.get("/logout", function(req, res) {
	// get this for free, but still need to re-direct
	req.logout();
	req.flash("success", "You have logged out!");
	res.redirect("/campgrounds");
});

module.exports = router;


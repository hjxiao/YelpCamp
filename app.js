var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var User = require("./models/user");
var seedDB = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
		commentRoutes 	 = require("./routes/comments"),
		indexRoutes 		 = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
seedDB();

// Passport Configuration

app.use(require("express-session")({
	// This helps us encrypt and decrypt passwords
	secret: "Rusty is a pretty cute dog.",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	// if there's something in req.flash, we have access to it
	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// Set up app to listen on port 3000
app.listen(3000, function(req, res) {
	console.log("App is listening on port 3000");
});

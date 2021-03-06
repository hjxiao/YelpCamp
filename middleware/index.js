var Campground = require("../models/campground");
var Comment = require("../models/comment");

// All the middleware goes here

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	// Is user logged in?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if (err) {
				req.flash("error", "Campground not found.");
				res.redirect("back");
			} else {	
				// Did user create the campground?
				// one is object, other is string
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission. Denied.");
					res.redirect("back");
				}
			}	
		});	
	} else {
		req.flash("error", "You need to login first!");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	// Is user logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if (err) {
				res.redirect("back");
			} else {	
				// Did user create the comment?
				// one is object, other is string
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash("error", "You don't have permission. Denied.");
					res.redirect("back");
				}
			}	
		});	
	} else {
		req.flash("error", "Please login first.");
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "You need to login first!");
	res.redirect("/login");
};

module.exports = middlewareObj

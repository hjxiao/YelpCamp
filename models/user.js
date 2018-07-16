// MongoDB SCHEMA

var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
});

// adds methods into the User object in app.js
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

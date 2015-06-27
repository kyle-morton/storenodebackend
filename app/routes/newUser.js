var bodyParser = require('body-parser'); 	// get body-parser
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');
var config     = require('../../config');

// super secret for creating tokens
var superSecret = config.secret;

module.exports = function(app, express) {

	var newUserRouter = express.Router();

	// route to generate sample user
	newUserRouter.post('/', function(req, res) {

		console.log("/newUser called with : " + req);

		// look for the user named chris
		User.findOne({ 'username': req.username}, function(err, user) {

			console.log("looked for user with that username: " + req.username)

			// if there is no chris user, create one
			if (!user) {

				console.log("new user!");

				var newUser = new User();

				console.log("after declaring new user");

				//Create New user object
				newUser.name = req.name;
				newUser.username = req.username;
				newUser.password = req.password;
				newUser.email = req.email;
				newUser.address = req.address;
				newUser.phone = req.phone;

				console.log("newUser : " + newUser);

				//Persist to mongoDB
				newUser.save();

				console.log("saved new user!");

			} else {
				console.log("Existing user found");

				// if there is a user, update his info
				newUser.name = req.name;
				newUser.email = req.email;
				newUser.address = req.address;
				newUser.phone = req.phone;
				user.save();
			}

		});

		console.log("/newUser post ended!");

	});


	return newUserRouter;
};

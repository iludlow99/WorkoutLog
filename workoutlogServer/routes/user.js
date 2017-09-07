var router = require('express').Router()
var sequelize = require('../db.js')
var User = sequelize .import('../models/user')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')


router.post('/', function(req, res) {
		var user = req.body.user.username;
		var pass = req.body.user.password; //TODO: Hash this password

		//Need to create a user object and use sequelize to put that user into

		User.create({
			username: user,
			passwordhash: bcrypt.hashSync(pass, 10) //TODO: Make it hashed
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				var token = jwt.sign({id:user.id},'i_am_secret', {expiresIn: 60*60*24})
				res.json({
						user: user,
						message: 'created',
						sessionToken: token
				});
			},
			function createError(err){
				res.send(500, err.message);

			}
		);
	});

module.exports = router
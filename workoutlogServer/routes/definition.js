var router = require('express').Router()
var sequelize = require('../db.js')
var User = sequelize.import('../models/user.js')
var Definition = sequelize.import('../models/definition.js')


router.post('/', function(req, res) {
	//variables
	var descrption = req.body.definition.desc
	var logType = req.body.definition.type
	var owner = req.user.id

	//methods

	Definition
		.create({
				descrption: descrption,
				logType: logType,
				owner: owner
		})
		.then(
				//createSuccess function
				function createSuccess(definition) {
					//send a response as json
					res.json({
						definition: definition
					})
				},
				//createError 
				function createError(err) {
					res.send(500, err.message)
				}

		)		
})
router.get('/', function(req, res) {
	//user variable
	var userid = req.user.id

Definition
	//findAll by owner method
	.findAll({
		where: { owner: userid }
	})

	.then(
		//success
		function findAllSuccess(data) {
			//console.log.log(data)
			res.json(data)
		},
		//error
		function findAllError(err) {
			res.send(500, err.message)
		}
	)
})

module.exports = router
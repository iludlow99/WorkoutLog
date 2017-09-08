require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js')

var User = sequelize.import('./models/User')


//Create a table
User.sync(); // sync( {force: true}) WARNING: This will drop (delete) the table!
app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'))
//Creating a user
app.use('/api/user', require('./routes/user'))
//Logging in a user
app.use('/api/login', require('./routes/session'))
//localhost:3000/user/login
// app.use('./api/definition', require('./routes/definition'))

// app.use('./api/log', require('./routes/log'))


app.use('/api/test', function(req, res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log('App is listening on 3000.')
});

app.post('/api/user', function(req, res) {
		var user = req.body.user.username;
		var pass = req.body.user.password;
		//Need to create a user object and use sequelize to put that user into
		//

		User.create({
			username: user,
			passwordhash: pass
		}).then(
		//Sequelize is going to return the object it created from db.

			function createSuccess(user){
				res.json({
						user: user,
						message: 'create'
				});
			},
			function createError(err){
				res.send(500, err.message);

			}
		);
	});



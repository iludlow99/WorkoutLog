module.exports  = function (req, res, next) /*Not exactly sure what the perameters are doing...*/{
	res.header('access-control-allow-origin', '*')  //This line says we're allowing commmunication from any origin/server to any other origin/server
	res.header('access-control-allow-headers', 'GET, POST, PUT, DELETE')

res.header('access-control-allow-headers', 'Origin, X-Requested-With,\
	Content-Type, Accept, Authorization')
	next() //The "next" key word is a built in key word saying, if a file isn't found, move on to the next file
}
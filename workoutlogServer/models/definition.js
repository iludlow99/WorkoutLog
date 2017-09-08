module.exports = function(sequelize, DataTypes) {
//With define, the first argument is going to represent a column in the db table

	return sequelize.define('define', {
		description: DataTypes.STRING,
		logType: DataTypes.STRING, /*by time, reps, weight, etc...*/
		owner: DataTypes.INTEGER
	},{	
	})
}
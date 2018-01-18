var mysql = require('mysql');

module.exports = mysql.model('node', {
	text : String,
	done : Boolean
});
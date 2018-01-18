var Todo = require('./models/home');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/home', function(req, res) {

		// use mongoose to get all todos in the database
		connection.query('CALL getDepatramentos()', function(error, rows,fields){
	        if (!!error) {
	            res.send(err);
	        } else {
	            console.log("success"); 
	            console.log(rows);
	        }
	    });

	});
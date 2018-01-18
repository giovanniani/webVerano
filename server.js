var express = require('express');
var http = require('http');
var mysql = require("mysql");
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
    
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'registro'
});

connection.connect(function(error) {
	if(!!error){
		console.log('error');
	} else {
		console.log("connected");
	}
});

app.get('/home', function(req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
	connection.query('CALL getDepatramentos()', function(error, rows,fields){
        if (!!error) {
            console.log("error");
        } else {
            resp.json(rows[0]); 
        }
    });
})


app.get('/insert/:id/:nombre', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log(req.params.id);
    connection.query('CALL agregarDepartamento(?,?)', [req.params.id,req.params.nombre], function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});


app.listen(3000);
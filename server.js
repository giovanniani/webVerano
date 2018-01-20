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
    database : 'servicioexcursiones'
});

connection.connect(function(error) {
	if(!!error){
		console.log('error');
	} else {
		console.log("connected");
	}
});

app.get('/insertVehiculo/:placa/:marca/:tipo/:capacidad/:cedula', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspInsertarVehiculo(?,?,?,?,?)', [req.params.placa,req.params.marca,req.params.tipo,
        req.params.capacidad,req.params.cedula], function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});


app.get('/insertCategoria/:nombre', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspInsertarCategoria(?)', [req.params.nombre], function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});

app.get('/getCategoria/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspVerCategorias()', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});

app.get('/getTipoVehiculo/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspVerTiposVehiculos()', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});

app.get('/getMarcasVehiculo/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspVerMarcas()', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});

app.get('/agregarDestino/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspInsertarDestino(?,?,?,?)', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});
app.listen(3000);
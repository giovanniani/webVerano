var express = require('express');
var http = require('http');
var mysql = require("mysql");
var app = express();
var url = require('url');
var bodyParser = require("body-parser");
var methodOverride = require('method-override');


var port = 3000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
    
var connection = mysql.createConnection({
    host     : '192.168.0.20',
    user     : 'root',
    password : 'root',
    database : 'servicioexcursiones'
});

connection.connect(function(error) {
	if(!!error){
		console.log(error);
	} else {
		console.log("connected - "+ new Date().toLocaleString());
	}
});

app.get('/insertVehiculo/:placa/:marca/:tipo/:capacidad/:mantenimiento/:cedula', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspInsertarVehiculo(?,?,?,?,?,?)', [req.params.placa,req.params.marca,req.params.tipo,
        req.params.capacidad,req.params.mantenimiento,req.params.cedula], function(err, rows) {
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

app.get('/getChoferes/', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");    
    connection.query('CALL uspVerChoferes()', function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});

app.get('/insertDestino/:nombre/:lugar/:categoria/:descripcion', function (req, resp) {
    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "X-Requested-With");
    connection.query('CALL uspInsertarDestino(?,?,?,?)', [req.params.nombre,req.params.lugar,
        req.params.categoria,req.params.descripcion], function(err, rows) {
        if (err) throw err;
        resp.json(rows[0]);
    });

});


app.listen(port);
console.log("Listening on port:" + port);
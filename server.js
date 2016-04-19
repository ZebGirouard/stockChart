'use strict';

var express = require('express'),
	routes = require('./app/routes/index.js'),
	mongoose = require('mongoose'),
	session = require('express-session'),
	http = require('http'),
	sio = require('socket.io');
	
// create http server
var server = http.createServer().listen(8081, process.env.IP),

// create socket server
io = sio.listen(server);

// set socket.io debugging

io.sockets.on('connection', function (socket) {

  socket.on('clientCall', function (data) {
  	io.sockets.emit('serverResponse', { message: 'Stocks updated!' });
  });

});	

var app = express();

require('dotenv').load();

var mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;

mongoose.connect(mongoURI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
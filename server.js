/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

var bGround = require('fcc-express-bground');
var myApp = require('./myApp');
var express = require('express');
var app = express();

if (!process.env.DISABLE_XORIGIN) {
	app.use(function(req, res, next) {
		var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
		var origin = req.headers.origin || '*';
		if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
				console.log(origin);
				res.setHeader('Access-Control-Allow-Origin', origin);
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		}
		next();
	})
	.use("/public", express.static(__dirname + '/public'))
	.get("/", function(req, res) {
		res.sendFile(__dirname + "/views/index.html");
	})
	.get("/json", function(req, res) {
		res.json({
			"message": (process.env.MESSAGE_STYLE === 'uppercase') ? "HELLO JSON" : "Hello json"
		});
	})
	.use("/now", function(req, res, next) {
		req.time = new Date().toString();
		next();
	}).get("/now", function(req, res) {
		// check if /now route has a middleware before the handler
		var stack = (myApp.parent._router && myApp.parent._router.stack) || [];
		var nowRoute = stack.filter((l) => {
			if (l.route) {
				return l.route.path === '/now';
			}
			return false;
		});
		myApp._router = myApp.parent._router;
		res.json({
			time: req.time
		});
	});
}

var port = process.env.PORT || 3000;
myApp._router = { stack: [...app._router.stack] };
bGround.setupBackgroundApp(app, myApp, __dirname).listen(port, function(){
	//console.log(myApp.parent._router.stack);
	bGround.log('Node is listening on port '+ port + '...')
});

/******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/


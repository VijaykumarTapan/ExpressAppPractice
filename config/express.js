var config = require('./config'), /*This will look for config.js in the config folder. If no config.js exists it will look for index.js*/
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session');

module.exports = function()
{
	var app = express();
	
	if(process.env.NODE_ENV === 'development')
	{
		app.use(morgan('dev'));
		console.log("Using development Env");
	}
	else if(process.env.NODE_ENV === 'production')
	{
		app.use(compress());
		console.log("Using production Env");
	}
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());
	
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}))
	
	// Add headers
	app.use(function (req, res, next) {
	
		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
	
		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	
		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	
		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);
	
		// Pass to next layer of middleware
		next();
		
		console.log("Access control allowed");
	});
	
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/favorites.server.routes.js')(app);
	
	app.use(express.static('./public'));
	
	return app;
};
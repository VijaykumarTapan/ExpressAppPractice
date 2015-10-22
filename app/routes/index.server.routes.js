module.exports = function(app)
{
	var index = require('../controllers/index.server.controller');
	app.get('/',  index.render);
	var television = require('../controllers/television.server.controller');
	app.get('/television', television.render);
	var books = require('../controllers/books.server.controller');
	app.get('/books', books.render);
};
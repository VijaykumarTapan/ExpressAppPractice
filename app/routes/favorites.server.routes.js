var favs = require('../../app/controllers/favorites.server.controller');

module.exports = function(app)
{
	app.route('/favorites').post(favs.create).get(favs.list);
	
	app.route('/favorites/:favId')
		.get(favs.read)
		.delete(favs.delete);
	
	app.param('favId', favs.favByID);

};
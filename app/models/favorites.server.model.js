var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	
var FavSchema = new Schema({
	name: String,
	author: String
});

mongoose.model('Favorites', FavSchema);
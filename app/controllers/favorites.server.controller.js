var Favs = require('mongoose').model('Favorites');

exports.create = function(req, res, next)
{
	console.log(req.body);
	var favs = new Favs(req.body);
	favs.save(function(err){
		if(err){
			return next(err);
		} else {
			res.json(favs)
		}
	});
};

exports.list = function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	Favs.find({}, function (err, favs) {
		if (err) {
			return next(err);
		}
		else {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.json(favs);
		}
	});
};

exports.read = function(req, res)
{
	res.json(req.fav)
	console.log(req.fav);
};

exports.favByID = function(req, res, next, id)
{
	Favs.findOne({
		_id: id
	},
	function(err, fav){
		if(err){
			return next(err);
		}
		else {
			req.fav = fav;
			next(); 
		}
	});	
};

exports.delete = function(req, res, next)
{
	req.fav.remove(function(err){
		if(err)
		{
			return next(err);
		}
		else
		{
			res.json(req.fav);
		}	
	})
};
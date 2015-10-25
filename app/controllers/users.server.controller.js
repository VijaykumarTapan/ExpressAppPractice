var User = require('mongoose').model('User');

exports.create = function (req, res, next) {

	res.setHeader('Access-Control-Allow-Credentials', true);
	var user = new User(req.body);

	user.save(function (err) {
		if (err) {
			return next(err);
		} else {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.json(user);
		}
	});
};

exports.list = function (req, res, next) {
	User.find({}, function (err, users) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		if (err) {
			return next(err);
		}
		else {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.json(users);
		}
	});
};

exports.read = function (req, res) { 
	res.json(req.user); 
};

exports.userByID = function (req, res, next, id) {
	 User.findOne({
		  _id: id 
	 }, function (err, user) { 
		if (err) { 
			return next(err); 
		} else { 
			req.user = user; 
			next(); 
		} 
	}); 
};

exports.update = function(req, res, next) { 
	 User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		     if (err) {
			   	return next(err);    
		     } else { 
				res.json(user);    
			 }  
	});
};


exports.delete = function(req, res, next) { 
	 req.user.remove(function(err) {
		     if (err) {
			   	return next(err);    
		     } else { 
				res.json(req.user);    
			 }  
	})
};
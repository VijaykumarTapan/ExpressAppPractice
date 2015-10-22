exports.render = function(req, res)
{
	res.render('television', {
		title: 'Favorite Television Shows',
		show_1: 'Arrow',
		show_2: 'Flash',
		show_3: 'Faking It' 
	});
};
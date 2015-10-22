exports.render = function(req, res)
{
	res.render('books', {
		title: 'Favorite Books',
		book_1: 'Harry Potter Series',
		book_2: 'The Way of Kings',
		book_3: 'The Name of the Wind' 
	});
};
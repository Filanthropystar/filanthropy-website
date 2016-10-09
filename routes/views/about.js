var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'about';
	locals.title = 'About Filanthropy*';

var User = keystone.list('User');	

	// Load Organisers
	view.on('init', function(next) {
		User.model.find()
		.sort('name.first')
		.where('isPublic', true)
		.where('isFilanthropyMember', true)
		.where('isCurrentFilanthropyMember', true)
		.exec(function(err, members) {
			if (err) res.err(err);
			locals.currentMembers = members;
			next();
		});
	});

	view.on('init', function(next) {
		User.model.find()
		.sort('name.first')
		.where('isPublic', true)
		.where('isFilanthropyMember', true)
		.where('isCurrentFilanthropyMember', false)
		.exec(function(err, members) {
			if (err) res.err(err);
			locals.withThanks = members;
			next();
		});
	});
	
	view.render('about');
	
}

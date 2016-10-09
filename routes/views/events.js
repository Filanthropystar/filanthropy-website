var keystone = require('keystone'),
	moment = require('moment');
	

var FilanthropyEvent = keystone.list('FilanthropyEvent');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'events';
	//locals.page.title = 'Events - Filanthropy*';
	
	view.query('upcomingEvent',
		FilanthropyEvent.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
	, 'projects');
	
	view.query('pastEvents',
		FilanthropyEvent.model.find()
			.where('state', 'past')
			.sort('-startDate')
	);
	
	
	view.render('events');
	
}

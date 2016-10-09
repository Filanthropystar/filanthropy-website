var keystone = require('keystone'),
	moment = require('moment'),
	FilanthropyEvent = keystone.list('FilanthropyEvent');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'events';
	
	
	// LOAD the Meetup
	
	view.on('init', function(next) {
		FilanthropyEvent.model.findOne()
			.where('key', req.params.filanthropyEvent)			
			.exec(function(err, FilanthropyEvent) {
				
				if (err) return res.err(err);
				if (!FilanthropyEvent) return res.notfound('Event not found');
				
				locals.ev = FilanthropyEvent;
				//locals.page.title = 'Filanthropy* Events - ' + FilanthropyEvent.name;
				locals.ev.populateRelated('projects', next);
								
			});
	});
	
	
	view.render('filanthropyEvent');
	
}

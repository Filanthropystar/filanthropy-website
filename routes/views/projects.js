var keystone = require('keystone'),
	moment = require('moment');
	

var Project = keystone.list('Project');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'projects';
	locals.title = 'Projects - Filanthropy*';
	
	view.query('featuredProject',
		Project.model.findOne( { 'featured' : true, 'state' : 'published'})
			
	);
	
	view.query('otherProjects',
		Project.model.find().where('state', 'published').sort('-updatedAt')
			
	);
	
	
	view.render('projects');
	
}

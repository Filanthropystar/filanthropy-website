var keystone = require('keystone'),
	moment = require('moment'),
	Project = keystone.list('Project');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = 'project';
	
	
	// LOAD the Project
	
	view.on('init', function(next) {
		Project.model.findOne()
			.where('key', req.params.project)
			.exec(function(err, Project) {
				
				if (err) return res.err(err);
				if (!Project) return res.notfound('Project not found');
				
				locals.Project = Project;
				locals.title = 'Projects - ' + Project.name + ' - Filanthropy*';
				next();
				
			});
	});
	
	
	view.render('project');
	
}

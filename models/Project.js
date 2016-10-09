var keystone = require('keystone'),
	_ = require('underscore'),
	Types = keystone.Field.Types;

/**
 * Talks Model
 * ===========
 */

var Project = new keystone.List('Project', {
	sortable: true,
	defaultSort: '-featured',
	sortContext: 'FilanthropyEvent:projects',
	autokey: { path: 'key', from: 'name', unique: true },
	track: true
});

Project.add({
	name: { type: String, required: true, initial: true },
	filanthropyEvents: { type: Types.Relationship, ref: 'FilanthropyEvent', index: true, many: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	shortDescription: { type: Types.Textarea},
	description: { type: Types.Html, wysiwyg: true },
	logo: {type: Types.CloudinaryImage},
	website: { type: Types.Url },
	twitterName: {type: String, note: 'Twitter Username, not the Url to their Twitter Account'},
	facebook: {type:String, note:'facebook Username, not the Url to their Facebook Account'},
	bannerImage: {type: Types.CloudinaryImage, note: 'Should have a Width to Height Ratio of 2.61. Ie if the width is 1400,' +
	 'the height should be 1400 / 2.61'},
	featured: { type: Types.Boolean }
});


/**
 * Registration
 * ============
 */

Project.defaultColumns = 'name, filanthropyEvents, link, shortDescription, featured, state' ;
Project.register();

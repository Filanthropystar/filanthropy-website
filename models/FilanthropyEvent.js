var keystone = require('keystone'),
	moment = require('moment'),
	_ = require('underscore'),
	Types = keystone.Field.Types;

/**
 * Events Model
 * =============
 */

var FilanthropyEvent = new keystone.List('FilanthropyEvent', {
	label: 'Event',
	plural: 'Events',
	autokey: { path: 'key', from: 'name', unique: true },
	track: true
});

FilanthropyEvent.add({
	name: { type: String, required: true, initial: true },
	publishedDate: { type: Types.Date, index: true },	
	state: { type: Types.Select, options: 'draft, scheduled, active, past', noedit: true },	
	startDate: { type: Types.Datetime, required: true, initial: true, index: true, width: 'short', note: 'e.g. 2014-07-15 / 6:00pm' },
	endDate: { type: Types.Datetime, required: true, initial: true, index: true, width: 'short', note: 'e.g. 2014-07-15 / 9:00pm' },	
	place: { type: String, required: false, initial: true, width: 'medium'},
	map: { type: String, required: false, initial: true, width: 'medium'},
	description: { type: Types.Html, wysiwyg: true },
	review: { type: Types.Html, wysiwyg: true },
	bannerImage: {type: Types.CloudinaryImage},
	photoAlbumId: {type: String, required: false, note: "This is the Id of the flickr album which is the last part of the flickr album url"},
	raised: {type: Number, required: false},
	projects: { type: Types.Relationship, ref: 'Project', index: true, many: true },
	legacy: { type: Boolean, noedit: true, collapse: true },
	facebook: {type: String, note: 'the URL to the event facebook page'}
});




// Relationships
// ------------------------------

FilanthropyEvent.relationship({ ref: 'Project', refPath: 'filanthropyEvents', path: 'projects' });


// Virtuals
// ------------------------------

FilanthropyEvent.schema.virtual('url').get(function() {
	return '/events/' + this.key;
});



// Pre Save
// ------------------------------

FilanthropyEvent.schema.pre('save', function(next) {
	
	var filanthropyEvent = this;
	
	// If no published date, it's a draft meetup
	if (!filanthropyEvent.publishedDate) filanthropyEvent.state = 'draft';
	
	// If meetup date plus one day is after today, it's a past meetup
	else if (moment().isAfter(moment(filanthropyEvent.startDate).add('day', 1))) filanthropyEvent.state = 'past';
	
	// If publish date is after today, it's an active meetup
	else if (moment().isAfter(filanthropyEvent.publishedDate)) filanthropyEvent.state = 'active';
	
	// If publish date is before today, it's a scheduled meetup
	else if (moment().isBefore(moment(filanthropyEvent.publishedDate))) filanthropyEvent.state = 'scheduled';
	
	next();

});


// Methods
// ------------------------------



/**
 * Registration
 * ============
 */

FilanthropyEvent.defaultSort = '-startDate';
FilanthropyEvent.defaultColumns = 'name, state|10%, startDate|15%, raised, publishedDate|15%';
FilanthropyEvent.register();

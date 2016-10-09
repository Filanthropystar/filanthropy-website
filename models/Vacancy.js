var keystone = require('keystone'),
	Types = keystone.Field.Types;


var Vacancy = new keystone.List('Vacancy', {
	map: 'title',
	autokey: { path: 'key', from: 'title', unique: true },
	sortable: true
});

Vacancy.add({
	title: { type: String,  initial: true, required: true},
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	description: {type: Types.Html},
	contact: {type: Types.Email},
	publishedDate: { type: Types.Date, index: true }
});


/**
 * Registration
 * ============
 */

Vacancy.defaultColumns = 'title, contact, state|20%, publishedDate';
Vacancy.register();

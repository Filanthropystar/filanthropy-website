var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Organisations Model
 * ===================
 */

var Organisation = new keystone.List('Organisation', {
	autokey: { path: 'key', from: 'name', unique: true },
	track:true
});

Organisation.add({
	name: { type: String, index: true },
	logo: { type: Types.CloudinaryImage },
	website: Types.Url,
	keyPartner: { type: Boolean, note: 'This controls which organistaions appear on front page and as larger text on Friends & Partners page'},
	description: { type: Types.Html }	
});



/**
 * Registration
 * ============
 */


Organisation.defaultColumns = 'name, website, keyPartner';
Organisation.register();

import {Meteor} from 'meteor/meteor';
import {Categories} from '../../api/categories.js';
import {Cardsets} from '../../api/cardsets.js';
import {Cards} from '../../api/cards.js';

import { Colleges } from '../../api/colleges.js';

Meteor.subscribe("colleges");

// Check if user has permission to look at a cardset
Template.registerHelper("hasPermission", function () {
	if (Roles.userIsInRole(Meteor.userId(), 'lecturer')) {
		return this.owner === Meteor.userId() || this.visible === true || this.request === true;
	} else {
		return this.owner === Meteor.userId() || this.visible === true;
	}
});

// Check if user is owner of a cardset
Template.registerHelper("isOwnerCard", function () {
	var owner;
	if (this._id) {
		owner = Cardsets.findOne(Router.current().params._id).owner;
	}
	return owner === Meteor.userId();
});

Template.registerHelper("isOwner", function () {
	var owner;
	if (this.owner) {
		owner = this.owner;
	} else if (Template.parentData(1)) {
		owner = Template.parentData(1).owner;
	}
	return owner === Meteor.userId();
});

// Returns the number of cards in a carddeck
Template.registerHelper("countCards", function (cardset_id) {
	return Cardsets.findOne({_id: cardset_id}).quantity;
});

// Returns all Cards of a Carddeck
Template.registerHelper("getCards", function () {
	return Cards.find({
		cardset_id: this._id
	});
});

// Returns the locale date
Template.registerHelper("getDate", function () {
	return moment(this.date).locale(getUserLanguage()).format('LL');
});

// Returns the locale date
Template.registerHelper("getDateUpdated", function () {
	return moment(this.dateUpdated).locale(getUserLanguage()).format('LL');
});

// Returns the locale date with time
Template.registerHelper("getTimestamp", function () {
	return moment(this.date).locale(getUserLanguage()).format('LLLL');
});

// Returns all Categories
Template.registerHelper("getCategories", function () {
	return Categories.find({}, {
		sort: {
			_id: 1
		}
	});
});

//Returns all Colleges
Template.registerHelper("getColleges", function() {
  return Colleges.find();
});

// Return the name of a Category
Template.registerHelper("getCategory", function (value) {
	if (value !== null) {
		var id = value.toString();
		if (id.length === 1) {
			id = "0" + id;
		}

		var category = Categories.findOne(id);
		if (category !== undefined) {
			return category.name;
		}
	}
});

// Returns if user is deleted or not
Template.registerHelper("userExists", function (userDeleted) {
	return userDeleted !== true;
});

// i18n type notifications
Template.registerHelper("getType", function (type) {
	if (type === 'Gemeldeter Benutzer') {
		type = TAPi18n.__('notifications.reporteduser');
	} else if (type === 'Gemeldeter Kartensatz') {
		type = TAPi18n.__('notifications.reportedcardset');
	} else if (type === 'Adminbenachrichtigung (Beschwerde Benutzer)') {
		type = TAPi18n.__('notifications.reporteduseradmin');
	} else if (type === 'Adminbenachrichtigung (Beschwerde Kartensatz)') {
		type = TAPi18n.__('notifications.reportedcardsetadmin');
	} else if (type === 'Dozenten-Anfrage') {
		type = TAPi18n.__('notifications.lecturer');
	}

	return type;
});

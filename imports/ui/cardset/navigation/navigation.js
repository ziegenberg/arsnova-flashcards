//------------------------ IMPORTS
import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {Leitner, Wozniak} from "../../../api/learned";
import "./item/learning.js";
import "./item/manage.js";
import "./item/presentation.js";
import "./item/workload.js";
import "./navigation.html";

/*
 * ############################################################################
 * cardsetNavigation
 * ############################################################################
 */

Template.cardsetNavigation.helpers({
	learning: function () {
		return (Leitner.findOne({
			cardset_id: Router.current().params._id,
			user_id: Meteor.userId()
		}) || Wozniak.findOne({
			cardset_id: Router.current().params._id,
			user_id: Meteor.userId(),
			interval: {$ne: 0}
		}));
	}
});

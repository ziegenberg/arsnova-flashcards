import "./statistics.html";
import {TranscriptBonus, TranscriptBonusList} from "../../../../api/transcriptBonus";
import {Template} from "meteor/templating";
import {Filter} from "../../../../api/filter";
import {FilterNavigation} from "../../../../api/filterNavigation";
import {Session} from "meteor/session";

/*
 * ############################################################################
 * cardsetTranscriptStatistics
 * ############################################################################
 */


Template.cardsetTranscriptStatistics.events({
	'click .filterAuthorTranscripts': function (event) {
		Session.set('transcriptViewingMode', 2);
		Filter.setActiveFilter($(event.target).data('id'), "author", 30);
		FilterNavigation.showDropdown();
	}
});

Template.cardsetTranscriptStatistics.helpers({
	transcriptBonusUser: function () {
		let transcriptBonusUsers = _.uniq(TranscriptBonus.find({cardset_id: Router.current().params._id}, {
			fields: {user_id: 1}
		}).fetch().map(function (x) {
			return x.user_id;
		}), true);
		return Meteor.users.find({_id: {$in: transcriptBonusUsers}}, {sort: {"profile.birthname": 1}, fields: {_id: 1}}).fetch();
	},
	getSubmissions: function (id) {
		return TranscriptBonus.find({cardset_id: Router.current().params._id, user_id: id}).count();
	},
	lastSubmission: function (id) {
		let bonusTranscript = TranscriptBonus.findOne({user_id: id}, {sort: {date: -1}});
		if (bonusTranscript !== undefined) {
			return TranscriptBonusList.getLectureName(bonusTranscript, false);
		}
	}
});

import {Template} from "meteor/templating";
import {Meteor} from "meteor/meteor";
import {NavigatorCheck} from "../../../../../../../api/navigatorCheck";
import "./bonus.html";
import {Session} from "meteor/session";

/*
* ############################################################################
* mainNavigationTopItemTranscriptsItemBonus
* ############################################################################
*/


Template.filterIndexPool.events({
	'click #navbar-transcripts-bonus': function () {
		Session.set('transcriptViewingMode', 1);
	}
});

Template.mainNavigationTopItemTranscriptsItemBonus.helpers({
	isSmartPhoneAndOwnsNoCards: function () {
		if (NavigatorCheck.isSmartphone()) {
			if (Meteor.user() && Meteor.user().count !== undefined) {
				return Meteor.user().count.transcripts === 0;
			}
		}
	}
});

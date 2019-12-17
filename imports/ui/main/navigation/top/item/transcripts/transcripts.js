import {Template} from "meteor/templating";
import {NavigatorCheck} from "../../../../../../api/navigatorCheck";
import {Meteor} from "meteor/meteor";
import "./item/personal.js";
import "./item/bonus.js";
import "./transcripts.html";
import {ServerStyle} from "../../../../../../api/styles";

/*
* ############################################################################
* mainNavigationTopItemTranscripts
* ############################################################################
*/

Template.mainNavigationTopItemTranscripts.helpers({
	isSmartPhoneAndOwnsNoCards: function () {
		if (NavigatorCheck.isSmartphone()) {
			if (Meteor.user() && Meteor.user().count !== undefined) {
				return Meteor.user().count.cardsets === 0 && Meteor.user().count.shuffled === 0 && Meteor.user().count.transcripts === 0;
			}
		}
	},
	gotBothNavigationElements: function () {
		return ServerStyle.gotNavigationFeature("transcript.bonus.enabled") && ServerStyle.gotNavigationFeature("transcript.personal.enabled");
	}
});

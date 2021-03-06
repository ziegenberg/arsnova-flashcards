//------------------------ IMPORTS
import {Meteor} from "meteor/meteor";
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import {Cardsets} from "../../../../api/subscriptions/cardsets";
import "./modal/removeUser.js";
import "./modal/userHistory.js";
import "./bonus.html";
import {Bonus} from "../../../../api/bonus";
import {LeitnerProgress} from "../../../../api/leitnerProgress";

Session.setDefault('selectedBonusUser', undefined);
Session.setDefault('selectedBonusUserHistoryData', undefined);

/*
* ############################################################################
* cardsetLearnActivityStatistic
* ############################################################################
*/

Template.cardsetLearnActivityStatistic.onRendered(function () {
	Session.set('activeCardset', Cardsets.findOne({_id: FlowRouter.getParam('_id')}));
});

Template.cardsetLearnActivityStatistic.helpers({
	getCardsetStats: function () {
		return Session.get("learnerStats");
	},
	getPercentage: function (count) {
		let totalCards = this.box1 + this.box2 + this.box3 + this.box4 + this.box5 + this.box6;
		let percentage = Math.round(count / totalCards * 100);
		if (percentage > 0) {
			return '<span class="cardPercentage">[' + percentage + ' %]</span>';
		}
	},
	earnedTrophy: function () {
		let totalCards = this.box1 + this.box2 + this.box3 + this.box4 + this.box5 + this.box6;
		let box6Percentage = (this.box6 / totalCards) * 100;
		return box6Percentage >= Session.get('activeCardset').workload.bonus.minLearned;
	},
	getAchievedBonus: function () {
		return Bonus.getAchievedBonus(this.box6, Session.get('activeCardset').workload, (this.box1 + this.box2 + this.box3 + this.box4 + this.box5 + this.box6));
	}
});

Template.cardsetLearnActivityStatistic.events({
	"click #exportCSV": function () {
		var cardset = Cardsets.findOne({_id: this._id});
		var hiddenElement = document.createElement('a');
		var header = [];
		header[0] = TAPi18n.__('leitnerProgress.box', {number: 1});
		header[1] = TAPi18n.__('leitnerProgress.box', {number: 2});
		header[2] = TAPi18n.__('leitnerProgress.box', {number: 3});
		header[3] = TAPi18n.__('leitnerProgress.box', {number: 4});
		header[4] = TAPi18n.__('leitnerProgress.box', {number: 5});
		header[5] = TAPi18n.__('leitnerProgress.learned');
		header[6] = TAPi18n.__('box_export_birth_name');
		header[7] = TAPi18n.__('box_export_given_name');
		header[8] = TAPi18n.__('box_export_mail');
		header[9] = TAPi18n.__('leitnerProgress.bonus');
		header[10] = TAPi18n.__('confirmLearn-form.notification');
		header[11] = TAPi18n.__('leitnerProgress.dateJoinedBonus');
		header[12] = TAPi18n.__('leitnerProgress.lastActivity');
		Meteor.call("getCSVExport", cardset._id, header, function (error, result) {
			if (error) {
				throw new Meteor.Error(error.statusCode, 'Error could not receive content for .csv');
			}
			if (result) {
				var statistics = TAPi18n.__('box_export_statistics');
				hiddenElement.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(result);
				hiddenElement.target = '_blank';
				var str = (cardset.name + "_" + statistics + "_" + new Date() + ".csv");
				hiddenElement.download = str.replace(/ /g, "_").replace(/:/g, "_");
				document.body.appendChild(hiddenElement);
				hiddenElement.click();
			}
		});
	},
	"click #backButton": function () {
		FlowRouter.go('cardsetdetailsid', {_id: this._id});
	},
	"click .detailed-stats": function (event) {
		LeitnerProgress.setupTempData(FlowRouter.getParam('_id'), $(event.target).data('id'), 'cardset');
		$('#progressModal').modal('show');
	},
	"click #showIntervalHelp": function (event) {
		event.stopPropagation();
		Session.set('helpFilter', "leitner");
		FlowRouter.go('help');
	},
	"click .showBonusUserHistory": function (event) {
		let user = {};
		user.user_id = $(event.target).data('id');
		user.firstName = $(event.target).data('firstname');
		user.lastName = $(event.target).data('lastname');
		if (user.user_id !== undefined) {
			Session.set('selectedBonusUser', user);
			Meteor.call("getLearningHistoryData", user.user_id, FlowRouter.getParam('_id'), function (error, result) {
				if (error) {
					throw new Meteor.Error(error.statusCode, 'Error could not receive content for history');
				}
				if (result) {
					Session.set('selectedBonusUserHistoryData', result);
				}
			});
		}
	},
	"click .removeBonusUser": function (event) {
		let user = {};
		user.user_id = $(event.target).data('id');
		user.firstName = $(event.target).data('firstname');
		user.lastName = $(event.target).data('lastname');
		user.email = $(event.target).data('email');
		user.box1 = $(event.target).data('box1');
		user.box2 = $(event.target).data('box2');
		user.box3 = $(event.target).data('box3');
		user.box4 = $(event.target).data('box4');
		user.box5 = $(event.target).data('box5');
		user.box6 = $(event.target).data('box6');
		user.mailNotification = $(event.target).data('mailnotification');
		user.webNotification = $(event.target).data('webnotification');
		user.dateJoinedBonus = $(event.target).data('datejoinedbonus');
		user.lastActivity = $(event.target).data('lastactivity');
		Session.set('selectedBonusUser', user);
	}
});

Template.cardsetLearnActivityStatistic.created = function () {
	Session.set("learnerStats", "");
	Meteor.call("getLearningData", FlowRouter.getParam('_id'), function (error, result) {
		if (error) {
			throw new Meteor.Error(error.statusCode, 'Error could not receive content for stats');
		}
		if (result) {
			Session.set("learnerStats", result);
		}
	});
};

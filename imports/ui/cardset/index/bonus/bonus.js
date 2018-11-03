//------------------------ IMPORTS
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import {Cardsets} from "../../../../api/cardsets";
import "./bonus.html";

/*
* ############################################################################
* cardsetLearnActivityStatistic
* ############################################################################
*/

Template.cardsetLearnActivityStatistic.onRendered(function () {
	Session.set('activeCardset', Cardsets.findOne({_id: Router.current().params._id}));
});

Template.cardsetLearnActivityStatistic.helpers({
	getCardsetStats: function () {
		return Session.get("learnerStats");
	},
	getPercentage: function (count) {
		let percentage = Math.round(count / Session.get('activeCardset').quantity * 100);
		if (percentage > 0) {
			return '<span class="cardPercentage">[' + percentage + ' %]</span>';
		}
	},
	earnedTrophy: function () {
		let totalCards = this.box1 + this.box2 + this.box3 + this.box4 + this.box5 + this.box6;
		let box6Percentage = (this.box6 / totalCards) * 100;
		return box6Percentage >= 95;
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
		header[9] = TAPi18n.__('leitnerProgress.percentage');
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
		Router.go('cardsetdetailsid', {_id: this._id});
	},
	"click .detailed-stats": function (event) {
		Router.go('progress', {
			_id: Router.current().params._id,
			user_id: $(event.target).data('id')
		});
	},
	"click #showIntervalHelp": function (event) {
		event.stopPropagation();
		Session.set('helpFilter', "leitner");
		Router.go('help');
	}
});

Template.cardsetLearnActivityStatistic.created = function () {
	Session.set("learnerStats", "");
	Meteor.call("getLearningData", Router.current().params._id, function (error, result) {
		if (error) {
			throw new Meteor.Error(error.statusCode, 'Error could not receive content for stats');
		}
		if (result) {
			Session.set("learnerStats", result);
		}
	});
};
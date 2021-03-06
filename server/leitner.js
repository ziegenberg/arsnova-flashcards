import {Meteor} from "meteor/meteor";
import {Leitner} from "../imports/api/subscriptions/leitner";
import {Workload} from "../imports/api/subscriptions/workload";
import {Cardsets} from "../imports/api/subscriptions/cardsets";
import {MailNotifier} from "./sendmail.js";
import {WebNotifier} from "./sendwebpush.js";
import {Bonus} from "../imports/api/bonus";
import {LeitnerUtilities} from "../imports/util/leitner.js";
import {ServerSettings} from "../imports/api/settings";
import {LeitnerTasks} from "../imports/api/subscriptions/leitnerTasks";

/** Function gets called when the learning-phase ended and excludes the cardset from the leitner algorithm
 *  @param {Object} cardset - The cardset from the active learning-phase
 * */
function disableLearning(cardset) {
	if (!Meteor.isServer) {
		throw new Meteor.Error("not-authorized");
	} else {
		let users = Workload.find({cardset_id: cardset._id, 'leitner.bonus': true}, {fields: {user_id: 1}}).fetch();
		for (let i = 0; i < users.length; i++) {
			if (Leitner.findOne({cardset_id: cardset._id, user_id: users[i].user_id, active: true}) !== undefined) {
				Leitner.update({cardset_id: cardset._id, user_id: users[i].user_id}, {
					$set: {
						active: false
					}
				}, {multi: true});
			}
		}
	}
}

/** Function returns all users who are currently registered as learning
 *  @param {string} cardset_id - The id of the cardset that got learners
 *  @returns {Object} - A list of users who are currently learning
 * */
function getLearners(cardset_id) {
	if (!Meteor.isServer) {
		throw new Meteor.Error("not-authorized");
	} else {
		var data = Leitner.find({cardset_id: cardset_id}).fetch();
		return _.uniq(data, false, function (d) {
			return d.user_id;
		});
	}
}

/** Function returns all cardsets with learners
 *  @returns {Object} - The cardsets with active learners
 * */
function getCardsets() {
	if (!Meteor.isServer) {
		throw new Meteor.Error("not-authorized");
	} else {
		return Cardsets.find({kind: {$nin: ['server']}}).fetch();
	}
}

/** Function returns the cards marked as active from an user who is learning
 *  @param {string} cardset_id - The id of the cardset with active learners
 *  @param {Object} user - The user from the cardset who is currently learning
 *  @returns {Object} - The cards from an user that are currently marked as active
 * */
function getActiveCard(cardset_id, user) {
	if (!Meteor.isServer) {
		throw new Meteor.Error("not-authorized");
	} else {
		return Leitner.findOne({
			cardset_id: cardset_id,
			user_id: user,
			active: true
		});
	}
}

Meteor.methods({
	/** Function gets called by the leitner Cronjob and checks which users are valid for receiving new cards / getting reset for missing the deadline / in which cardset the learning-phase ended*/
	updateLeitnerCards: function () {
		if (!Meteor.isServer) {
			throw new Meteor.Error("not-authorized");
		} else {
			let cardsets = getCardsets();
			let cardsetCount = 0;
			let currentCardsetWithLearners = 1;
			if (Meteor.settings.debug.leitner) {
				for (let i = 0; i < cardsets.length; i++) {
					if (Leitner.findOne({cardset_id: cardsets[i]._id})) {
						cardsetCount++;
					}
				}
			}
			for (let i = 0; i < cardsets.length; i++) {
				let learners = getLearners(cardsets[i]._id);
				let learnerCount = learners.length;
				if (Meteor.settings.debug.leitner && learnerCount > 0) {
					console.log("\nCardset " + currentCardsetWithLearners++ + " of " + cardsetCount + ": [" + cardsets[i].name + ", " + cardsets[i]._id + "]");
				}
				for (let k = 0; k < learners.length; k++) {
					if (!Bonus.isInBonus(cardsets[i]._id, learners[k].user_id) || cardsets[i].learningEnd.getTime() > new Date().getTime()) {
						if (Meteor.settings.debug.leitner) {
							console.log("=>User " + (k + 1) + " of " + learnerCount + ": " + learners[k].user_id);
						}
						let activeCard = getActiveCard(cardsets[i]._id, learners[k].user_id);
						let user = Meteor.users.findOne(learners[k].user_id);
						if (!activeCard) {
							LeitnerUtilities.setCards(cardsets[i], user, false);
						} else if ((activeCard.currentDate.getTime() + (cardsets[i].daysBeforeReset + 1) * 86400000) < new Date().getTime()) {
							LeitnerUtilities.resetCards(cardsets[i], user);
						} else {
							Meteor.call('prepareMail', cardsets[i], user);
							Meteor.call('prepareWebpush', cardsets[i], user);
							if (Meteor.settings.debug.leitner) {
								console.log("===> Nothing to do");
							}
						}
					}
				}
				if (cardsets[i].learningActive && cardsets[i].learningEnd.getTime() < new Date().getTime()) {
					disableLearning(cardsets[i]);
				}
			}
		}
	},
	prepareMail: function (cardset, user, isReset = false, isNewcomer = false, task_id = undefined) {
		if (Meteor.isServer) {
			if (user.mailNotification && ServerSettings.isMailEnabled() && !isNewcomer && Roles.userIsInRole(user._id, ['admin', 'editor', 'university', 'lecturer', 'pro']) && !Roles.userIsInRole(user._id, ['blocked', 'firstLogin'])) {
				try {
					if (isReset) {
						if (Meteor.settings.debug.leitner) {
							console.log("===> Sending E-Mail reset Message");
						}
						MailNotifier.prepareMailReset(cardset, user._id);
					} else {
						if (Meteor.settings.debug.leitner) {
							console.log("===> Sending E-Mail reminder Message");
						}
						MailNotifier.prepareMail(cardset, user._id);
						if (task_id !== undefined) {
							LeitnerTasks.update({
									_id: task_id
								},
								{
									$set: {
										'notifications.mail.active': true,
										'notifications.mail.sent': true,
										'notifications.mail.address': user.email
									}
								}
							);
						}
					}
				} catch (error) {
					console.log("[" + TAPi18n.__('admin-settings.test-notifications.sendMail') + "] " + error);
				}
			}
		}
	},
	prepareWebpush: function (cardset, user, isNewcomer = false, task_id = undefined) {
		if (Meteor.isServer) {
			if (ServerSettings.isPushEnabled() && (Bonus.isInBonus(cardset._id, user._id) || user.webNotification) && !isNewcomer) {
				try {
					let web = new WebNotifier();
					if (Meteor.settings.debug.leitner) {
						console.log("===> Sending Webpush reminder Message");
					}
					web.prepareWeb(cardset, user._id);
					if (task_id !== undefined) {
						LeitnerTasks.update({
								_id: task_id
							},
							{
								$set: {
									'notifications.web.active': true,
									'notifications.web.sent': true
								}
							}
						);
					}
				} catch (error) {
					console.log("[" + TAPi18n.__('admin-settings.test-notifications.sendWeb') + "] " + error);
				}
			}
		}
	}
});

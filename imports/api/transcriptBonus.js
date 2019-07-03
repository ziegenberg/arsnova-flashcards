import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {Cardsets} from "./cardsets";
import {UserPermissions} from "./permissions";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Route} from "./route.js";
import {check} from "meteor/check";
import {Utilities} from "./utilities";
import * as config from "../config/transcriptBonus.js";
import * as icons from "../config/icons.js";

export const TranscriptBonus = new Mongo.Collection("transcriptBonus");

if (Meteor.isServer) {
	Meteor.publish("cardsetTranscriptBonus", function (cardset_id) {
		if (this.userId) {
			let cardset = Cardsets.findOne({_id: cardset_id}, {fields: {_id: 1, owner: 1}});
			if (UserPermissions.isAdmin() || UserPermissions.isOwner(cardset.owner)) {
				return TranscriptBonus.find({cardset_id: cardset._id});
			} else {
				this.ready();
			}
		} else {
			this.ready();
		}
	});
	Meteor.publish("myTranscriptBonus", function () {
		if (this.userId) {
			return TranscriptBonus.find({user_id: this.userId});
		} else {
			this.ready();
		}
	});
}

const TranscriptBonusSchema = new SimpleSchema({
	cardset_id: {
		type: String
	},
	card_id: {
		type: String
	},
	user_id: {
		type: String
	},
	date: {
		type: Date
	},
	lectureEnd: {
		type: String
	},
	deadline: {
		type: Number
	},
	deadlineEditing: {
		type: Number
	},
	rating: {
		type: Number,
		optional: true
	}
});

TranscriptBonus.attachSchema(TranscriptBonusSchema);

Meteor.methods({
	addTranscriptBonus: function (card_id, cardset_id, user_id, date_id) {
		if (Meteor.isServer) {
			check(card_id, String);
			check(user_id, String);
			check(cardset_id, String);
			check(date_id, Number);
			let cardset = Cardsets.findOne({_id: cardset_id});

			if (cardset !== undefined) {
				TranscriptBonus.upsert({card_id: card_id}, {
					$set: {
						cardset_id: cardset._id,
						card_id: card_id,
						user_id: user_id,
						date: cardset.transcriptBonus.dates[date_id],
						lectureEnd: cardset.transcriptBonus.lectureEnd,
						deadline: cardset.transcriptBonus.deadline,
						deadlineEditing: cardset.transcriptBonus.deadlineEditing,
						dateCreated: new Date(),
						rating: 0
					}
				});
			}
			Meteor.call('updateTranscriptBonusStats', cardset._id);
		}
	},
	updateTranscriptBonusStats: function (cardset_id) {
		if (Meteor.isServer) {
			check(cardset_id, String);
			let cardset = Cardsets.findOne({_id: cardset_id});
			if (cardset !== undefined && cardset.transcriptBonus !== undefined) {
				let bonusTranscripts = TranscriptBonus.find({cardset_id: cardset._id}).fetch();
				let submissions = TranscriptBonus.find({cardset_id: cardset._id}).count();
				let userFilter = [];
				for (let i = 0; i < bonusTranscripts.length; i++) {
					userFilter.push(bonusTranscripts[i].user_id);
				}
				let participants = Meteor.users.find({_id: {$in: userFilter}}).count();
				Cardsets.update({_id: cardset._id}, {
					$set: {
						'transcriptBonus.stats.submissions': submissions,
						'transcriptBonus.stats.participants': participants
					}
				});
			}
		}
	}
});

export let TranscriptBonusList = class TranscriptBonusList {
	static addLectureEndTime (transcriptBonus, date) {
		let hours = Number(transcriptBonus.lectureEnd.substring(0, 2));
		let minutes = Number(transcriptBonus.lectureEnd.substring(3, 5));
		return moment(date).add(hours, 'hours').add(minutes, 'minutes');
	}

	static isDeadlineExpired (transcriptBonus, isEditingDeadline = false) {
		let deadline;
		if (isEditingDeadline) {
			deadline = transcriptBonus.deadlineEditing;
		} else {
			deadline = transcriptBonus.deadline;
		}
		return this.addLectureEndTime(transcriptBonus, transcriptBonus.date).add(deadline, 'hours') < new Date();
	}

	static canBeSubmittedToLecture (transcriptBonus, date_id) {
		if (transcriptBonus !== undefined && date_id !== undefined) {
			let cardset = Cardsets.findOne(transcriptBonus.cardset_id, {fields: {transcriptBonus: 1}});
			let startDate = this.addLectureEndTime(cardset.transcriptBonus, cardset.transcriptBonus.dates[date_id]);
			return cardset.transcriptBonus.enabled && startDate < new Date() && startDate.add(cardset.transcriptBonus.deadline, 'hours') > new Date();
		}
	}

	static checkForUpdate (card_id, user_id, transcriptBonusUser, transcriptBonusDatabase = undefined, date_id = undefined) {
		if (Meteor.isServer) {
			let transcriptBonusCardset = Cardsets.findOne(transcriptBonusUser.cardset_id);
			if (transcriptBonusDatabase !== undefined) {
				if (transcriptBonusUser.cardset_id !== transcriptBonusDatabase.cardset_id || transcriptBonusUser.date.getTime() !== transcriptBonusDatabase.date.getTime()) {
					if (this.canBeSubmittedToLecture(transcriptBonusUser, date_id)) {
						for (let i = 0; i < transcriptBonusCardset.transcriptBonus.dates.length; i++) {
							if (transcriptBonusCardset.transcriptBonus.dates[i].getTime() === transcriptBonusUser.date.getTime()) {
								date_id = i;
								break;
							}
						}
						if (date_id === undefined) {
							throw new Meteor.Error(TAPi18n.__('transcriptForm.server.notFound', {}, Meteor.user().profile.locale));
						} else {
							Meteor.call("addTranscriptBonus", card_id, transcriptBonusCardset._id, Meteor.userId(), date_id);
						}
					} else {
						throw new Meteor.Error(TAPi18n.__('transcriptForm.server.notFound', {}, Meteor.user().profile.locale));
					}
				}
			} else {
				Meteor.call("addTranscriptBonus", card_id, transcriptBonusUser.cardset_id, Meteor.userId(), date_id);
			}
		}
	}

	static getLectureName (transcriptBonus, addLectureName = true) {
		let name = "";
		if (addLectureName) {
			name += transcriptBonus.name + ": ";
		}
		name += this.getLectureEnd(transcriptBonus, transcriptBonus.date, false);
		return name;
	}

	static getLectureEnd (transcriptBonus, date_id) {
		if (transcriptBonus.lectureEnd !== undefined) {
			let lectureEnd = this.addLectureEndTime(transcriptBonus, date_id);
			return TAPi18n.__('transcriptForm.lecture') + ": " + Utilities.getMomentsDate(lectureEnd, false);
		}
	}

	static getDeadline (transcriptBonus, date_id) {
		if (transcriptBonus.lectureEnd !== undefined) {
			let deadline = this.addLectureEndTime(transcriptBonus, date_id);
			deadline.add(transcriptBonus.deadline, 'hours');
			return TAPi18n.__('transcriptForm.deadline.submission') + ": " + Utilities.getMomentsDate(deadline, true, true);
		}
	}

	static getDeadlineEditing (transcriptBonus, date_id) {
		if (transcriptBonus.lectureEnd !== undefined) {
			let deadlineEditing = this.addLectureEndTime(transcriptBonus, date_id);
			deadlineEditing.add(transcriptBonus.deadlineEditing, 'hours');
			return TAPi18n.__('transcriptForm.deadline.editing') + ": " + Utilities.getMomentsDate(deadlineEditing, true, true);
		}
	}

	static transformMedian (median) {
		if (isNaN(median)) {
			return 0;
		}
		if (config.roundTheMedian) {
			return Math.round(median);
		} else {
			return median.toFixed(1);
		}
	}

	static getBonusTranscriptRating (type = 0) {
		switch (type) {
			case 1:
				return icons.transcriptIcons.ratingAccepted;
			case 2:
				return icons.transcriptIcons.ratingDenied;
			default:
				return icons.transcriptIcons.ratingPending;
		}
	}

	static getSubmissions (user_id, rating) {
		let query = {user_id: user_id};
		if (Route.isTranscriptBonus()) {
			query.cardset_id = Router.current().params._id;
		}
		if (rating !== undefined) {
			query.rating = rating;
		}
		return TranscriptBonus.find(query).count();
	}

	static getBonusTranscriptTooltip (type = 0) {
		switch (type) {
			case 1:
				return TAPi18n.__('cardset.transcriptBonusRating.tooltip.accepted');
			case 2:
				return TAPi18n.__('cardset.transcriptBonusRating.tooltip.denied');
			default:
				return TAPi18n.__('cardset.transcriptBonusRating.tooltip.pending');
		}
	}
};

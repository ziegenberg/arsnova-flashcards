import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {Cardsets} from "./cardsets.js";
import {check} from "meteor/check";

export const Learned = new Mongo.Collection("learned");

if (Meteor.isServer) {
	Meteor.publish("learned", function () {
		if (this.userId && !Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			var cardsetsIds;
			if (Meteor.settings.public.university.singleUniversity) {
				cardsetsIds = Cardsets.find({
					owner: this.userId,
					college: Meteor.settings.public.university.default
				}).map(function (cardset) {
					return cardset._id;
				});
			} else {
				cardsetsIds = Cardsets.find({
					owner: this.userId
				}).map(function (cardset) {
					return cardset._id;
				});
			}

			var learned = Learned.find({
				$or: [
					{user_id: this.userId},
					{cardset_id: {$in: cardsetsIds}}
				]
			});
			return learned;
		}
	});
	Meteor.publish("allLearned", function () {
			if (this.userId && !Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
				if (Meteor.settings.public.university.singleUniversity) {
					return Learned.find({college: Meteor.settings.public.university.default});
				} else {
					return Learned.find({});
				}
			}
		}
	);
}

Meteor.methods({
	clearLearningProgress: function (cardset_id) {
		check(cardset_id, String);

		if (!Roles.userIsInRole(this.userId, ["admin", "editor", "lecturer"])) {
			throw new Meteor.Error("not-authorized");
		}
		Learned.remove({cardset_id: cardset_id});
	},
	addLearned: function (cardset_id, card_id) {
		check(cardset_id, String);
		check(card_id, String);

		// Make sure the user is logged in
		if (!Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			throw new Meteor.Error("not-authorized");
		}
		Learned.upsert({
			cardset_id: cardset_id,
			card_id: card_id,
			user_id: Meteor.userId()
		}, {
			$set: {
				cardset_id: cardset_id,
				card_id: card_id,
				user_id: Meteor.userId()
			},
			$setOnInsert: {
				box: 1,
				ef: 2.5,
				reps: 0,
				interval: 0,
				active: false,
				nextDate: new Date(),
				currentDate: new Date()
			}
		});
	},
	/** Function marks an active card as learned
	 *  @param {string} cardset_id - The cardset id from the card
	 *  @param {string} card_id - The id from the card
	 *  @param {boolean} isWrong - Did the user know the answer?
	 * */
	updateLearned: function (cardset_id, card_id, isWrong) {
		// Make sure the user is logged in
		if (!Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			throw new Meteor.Error("not-authorized");
		}

		check(cardset_id, String);
		check(card_id, String);
		check(isWrong, Boolean);

		var cardset = Cardsets.findOne({_id: cardset_id});

		if (cardset !== undefined) {
			var query = {};

			query.card_id = card_id;
			query.cardset_id = cardset_id;
			query.user_id = Meteor.userId();
			if (cardset.learningActive) {
				query.active = true;
			}
			var currentLearned = Learned.findOne(query);

			if (currentLearned !== undefined) {
				var selectedBox = currentLearned.box + 1;
				var nextDate = new Date();

				if (isWrong) {
					selectedBox = 1;
				}

				if (cardset.learningActive) {
					nextDate = new Date(nextDate.getTime() + cardset.learningInterval[selectedBox - 1] * 86400000);
				}

				Learned.update(currentLearned._id, {
					$set: {
						box: selectedBox,
						active: false,
						nextDate: nextDate,
						currentDate: new Date()
					}
				});
			}
		}
	},
	deleteLearned: function (cardset_id) {
		check(cardset_id, String);

		if (!Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			throw new Meteor.Error("not-authorized");
		}

		Learned.remove({
			cardset_id: cardset_id,
			user_id: Meteor.userId()
		});
	},
	updateLearnedMemo: function (learned_id, grade) {
		check(learned_id, String);
		check(grade, Number);

		// Make sure the user is logged in
		if (!Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			throw new Meteor.Error("not-authorized");
		}

		// EF (easiness factor) is a rating for how difficult the card is.
		// Grade: (0-2) Set reps and interval to 0, keep current EF (repeat card today)
		//        (3)   Set interval to 0, lower the EF, reps + 1 (repeat card today)
		//        (4-5) Reps + 1, interval is calculated using EF, increasing in time.

		var learned = Learned.findOne(learned_id),
			ef = learned.ef,
			reps = learned.reps,
			nextDate = new Date();
		var interval = 0;

		if (grade < 3) {
			reps = 0;
			interval = 0;
		} else {
			ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
			if (ef < 1.3) {
				ef = 1.3;
			}
			reps = reps + 1;
			if (grade === 3) {
				interval = 0;
			} else {
				switch (reps) {
					case 1:
						interval = 1;
						break;
					case 2:
						interval = 6;
						break;
					default:
						interval = Math.ceil((reps - 1) * ef);
						break;
				}
				nextDate.setDate(nextDate.getDate() + interval);
			}
		}

		Learned.update(learned_id, {
			$set: {
				ef: ef,
				reps: reps,
				interval: interval,
				nextDate: nextDate
			}
		});
	}
});

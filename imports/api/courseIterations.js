import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {check} from "meteor/check";

export const CourseIterations = new Mongo.Collection("courseIterations");


if (Meteor.isServer) {
	let universityFilter = {$ne: null};
	if (Meteor.settings.public.university.singleUniversity) {
		universityFilter = Meteor.settings.public.university.default;
	}
	Meteor.publish("courseIterations", function () {
		if (Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			return CourseIterations.find({college: universityFilter});
		}  else if (this.userId && !Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			return CourseIterations.find(
				{
					college: universityFilter,
					$or: [
						{visible: true},
						{owner: this.userId}
					]
				});
		}
	});
}

const CourseIterationsSchema = new SimpleSchema({
	name: {
		type: String
	},
	description: {
		type: String,
		optional: true
	},
	date: {
		type: Date
	},
	dateUpdated: {
		type: Date
	},
	editors: {
		type: [String]
	},
	owner: {
		type: String
	},
	visible: {
		type: Boolean
	},
	ratings: {
		type: Boolean
	},
	kind: {
		type: String
	},
	quantity: {
		type: Number
	},
	userDeleted: {
		type: Boolean
	},
	moduleActive: {
		type: Boolean
	},
	module: {
		type: String,
		optional: true
	},
	moduleToken: {
		type: String,
		optional: true
	},
	moduleNum: {
		type: String,
		optional: true
	},
	moduleLink: {
		type: String,
		optional: true
	},
	college: {
		type: String,
		optional: true
	},
	course: {
		type: String,
		optional: true
	},
	cardsetsGroup: {
		type: [String],
		optional: true
	},
	semester: {
		type: Number
	},
	price: {
		type: Number,
		decimal: true,
		optional: true
	}
});

CourseIterations.attachSchema(CourseIterationsSchema);

Meteor.methods({
	/**
	 * Adds a course
	 * @param {String} name - Title of the course
	 * @param {String} description - Description for the content of the course
	 * @param {Boolean} visible - Visibility of the course
	 * @param {Boolean} ratings - Rating of the course
	 * @param {String} kind - Type of cards
	 * @param {Boolean} moduleActive - Does the course use a module
	 * @param {String} module - Modulename
	 * @param {String} moduleShort - Abbreviation for the module
	 * @param {String} moduleNum - Number of the module
	 * @param {String} moduleLink - Link to the module description
	 * @param {String} college - Assigned university
	 * @param {String} course - Assigned university course
	 * @param {String} semester - Semester that the course belongs to
	 * @param {String} price - Price for the course
	 */
	addCourseIteration: function (name, description, visible, ratings, kind, moduleActive, module, moduleShort, moduleNum, moduleLink, college, course, semester, price) {
		if (Meteor.settings.public.university.singleUniversity || college === "") {
			college = Meteor.settings.public.university.default;
		}
		check(name, String);
		check(description, String);
		check(visible, Boolean);
		check(ratings, Boolean);
		check(kind, String);
		check(moduleActive, Boolean);
		check(module, String);
		check(moduleShort, String);
		check(moduleNum, String);
		check(moduleLink, String);
		check(college, String);
		check(course, String);
		check(semester, Number);
		check(price, Number);
		// Make sure the user is logged in before inserting a cardset
		if (!Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
			throw new Meteor.Error("not-authorized");
		}
		if (!Roles.userIsInRole(this.userId, ["admin", "editor", "lecturer"])) {
			kind = "personal";
			price = Number(0);
		}
		CourseIterations.insert({
			name: name.trim(),
			description: description,
			date: new Date(),
			dateUpdated: new Date(),
			editors: [],
			owner: Meteor.userId(),
			visible: visible,
			ratings: ratings,
			kind: kind,
			relevance: 0,
			raterCount: 0,
			quantity: 0,
			userDeleted: false,
			moduleActive: moduleActive,
			module: module.trim(),
			moduleToken: moduleShort.trim(),
			moduleNum: moduleNum.trim(),
			moduleLink: moduleLink.trim(),
			college: college.trim(),
			course: course.trim(),
			price: price.toString().replace(",", "."),
			semester: semester
		});
	},
	/**
	 * Updates the selected course
	 * @param {String} id - ID of the cardset to be updated
	 * @param {String} name - Title of the cardset
	 * @param {String} description - Description for the content of the cardset
	 * @param {Boolean} moduleActive - Does the cardset use a module
	 * @param {String} module - Module name
	 * @param {String} moduleShort - Abbreviation for the module
	 * @param {String} moduleNum - Number of the module
	 * @param {String} moduleLink - Link to the module description
	 * @param {String} college - Assigned university
	 * @param {String} course - Assigned university course
	 */
	updateCourseIteration: function (id, name, description, moduleActive, module, moduleShort, moduleNum, moduleLink, college, course) {
		if (Meteor.settings.public.university.singleUniversity) {
			college = Meteor.settings.public.university.default;
		}
		check(id, String);
		check(name, String);
		check(description, String);
		check(moduleActive, Boolean);
		check(module, String);
		check(moduleShort, String);
		check(moduleNum, String);
		check(moduleLink, String);
		check(college, String);
		check(course, String);

		// Make sure only the task owner can make a task private
		let courseIteration = CourseIterations.findOne(id);

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			if (!Meteor.userId() || courseIteration.owner !== Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
				throw new Meteor.Error("not-authorized");
			}
		}

		CourseIterations.update(id, {
			$set: {
				name: name.trim(),
				description: description,
				dateUpdated: new Date(),
				moduleActive: moduleActive,
				module: module.trim(),
				moduleToken: moduleShort.trim(),
				moduleNum: moduleNum.trim(),
				moduleLink: moduleLink.trim(),
				college: college.trim(),
				course: course.trim()
			}
		});
	},
	/**
	 * Delete selected course from database if user is auhorized.
	 * @param {String} id - Database id of the course to be deleted
	 */
	deleteCourseIteration: function (id) {
		check(id, String);
		// Make sure only the task owner can make a task private
		let courseIteration = CourseIterations.findOne(id);

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			if (!Meteor.userId() || courseIteration.owner !== Meteor.userId() || Roles.userIsInRole(this.userId, ["firstLogin", "blocked"])) {
				throw new Meteor.Error("not-authorized");
			}
		}
		CourseIterations.remove(id);
	}
});

import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Meteor} from "meteor/meteor";

export const APIAccess = new Mongo.Collection("apiAccess");

if (Meteor.isServer) {
	Meteor.publish("apiAccess", function () {
		if (Roles.userIsInRole(this.userId, 'admin')) {
			return APIAccess.find();
		}
	});
}

const APIAccessSchema = new SimpleSchema({
	cardset_id: {
		type: String
	},
	token: {
		type: String
	}
});

APIAccess.attachSchema(APIAccessSchema);

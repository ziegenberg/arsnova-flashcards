import {Meteor} from "meteor/meteor";
import {Cardsets} from "./cardsets.js";
import {Cards} from "./cards.js";
import {check} from "meteor/check";

if (Meteor.isServer) {
	Meteor.publish("allUsers", function () {
		if (Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			return Meteor.users.find({});
		} else {
			return [];
		}
	});
}

Meteor.methods({
	updateUser: function (user_id, visible, email, blockedtext) {
		check(user_id, String);
		check(visible, Boolean);

		if (email !== " ") {
			check(email, String);
		}
		if (blockedtext !== null)
		{
			check(blockedtext, String);
		}

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			throw new Meteor.Error("not-authorized");
		}

		Meteor.users.update(user_id, {
			$set: {
				visible: visible,
				email: email,
				blockedtext: blockedtext
			}
		});
	},
	deleteUser: function (user_id) {
		check(user_id, String);

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			throw new Meteor.Error("not-authorized");
		}

		var cardsets = Cardsets.find({
			owner: user_id,
			kind: 'personal'
		});

		cardsets.forEach(function (cardset) {
			Cards.remove({
				cardset_id: cardset._id
			});
		});

		Cardsets.update({owner: user_id}, {
			$set: {
				userDeleted: true
			}
		}, {multi: true});

		let allPrivateUserCardsets = Cardsets.find({
			owner: user_id,
			kind: 'personal'
		}).fetch();

		Cardsets.remove({
			owner: user_id,
			kind: 'personal'
		});

		for (let i = 0; i < allPrivateUserCardsets.length; i++) {
			Meteor.call('updateShuffledCardsetQuantity', allPrivateUserCardsets[i]._id);
		}

		Meteor.users.remove(user_id);
	},
	updateRoles: function (user_id, newRole) {
		check(user_id, String);
		check(newRole, String);

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			throw new Meteor.Error("not-authorized");
		}

		var roles;

		if (newRole === 'pro' && !Roles.userIsInRole(user_id, 'pro')) {
			Roles.removeUsersFromRoles(user_id, 'standard');
			roles = Roles.getRolesForUser(user_id);
			roles.push('pro');
		} else if (newRole === 'standard' && !Roles.userIsInRole(user_id, 'standard')) {
			Roles.removeUsersFromRoles(user_id, 'pro');
			roles = Roles.getRolesForUser(user_id);
			roles.push('standard');
		} else if (newRole === 'blocked' && Roles.userIsInRole(user_id, 'admin')) {
			throw new Meteor.Error("not-authorized");
		} else if (!Roles.userIsInRole(user_id, newRole)) {
			roles = Roles.getRolesForUser(user_id);
			roles.push(newRole);
		} else {
			roles = Roles.getRolesForUser(user_id);
		}

		Roles.setUserRoles(user_id, roles);
	},

	removeRoles: function (user_id, removeRole) {
		check(user_id, String);
		check(removeRole, String);

		if (!Roles.userIsInRole(this.userId, [
				'admin',
				'editor'
			])) {
			throw new Meteor.Error("not-authorized");
		}

		if (Roles.userIsInRole(user_id, removeRole)) {
			Roles.removeUsersFromRoles(user_id, removeRole);
		}
	}
});

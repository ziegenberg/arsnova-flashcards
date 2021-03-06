import {Accounts} from 'meteor/accounts-base';
import {ServerStyle} from "../../api/styles";
import {Meteor} from "meteor/meteor";

ServiceConfiguration.configurations.remove({
	service: 'facebook'
});

ServiceConfiguration.configurations.remove({
	service: 'twitter'
});

ServiceConfiguration.configurations.remove({
	service: 'google'
});

ServiceConfiguration.configurations.insert({
	service: 'facebook',
	appId: Meteor.settings.facebook.api,
	secret: Meteor.settings.facebook.secret
});

ServiceConfiguration.configurations.insert({
	service: 'twitter',
	consumerKey: Meteor.settings.twitter.api,
	secret: Meteor.settings.twitter.secret
});

ServiceConfiguration.configurations.insert({
	service: 'google',
	clientId: Meteor.settings.google.api,
	secret: Meteor.settings.google.secret
});

Accounts.validateNewUser((user) => {
	if (Meteor.settings.debug.login) {
		console.log("----------New User----------");
		console.log(user);
		console.log("----------New User----------");
	}
	return true;
});

Meteor.users.after.insert(function (userId, doc) {
	// Setup roles for backdoor login, required for acceptance tests
	if (ServerStyle.isLoginEnabled("backdoor")) {
		let backdoorRoles = ['firstLogin'];
		let username = "";
		let firstName = "";
		let lastName = "";
		let eMail = "";
		let isTestUser = false;
		switch (doc.username) {
			case "admin":
				username = "admin";
				firstName = "Super Admin";
				lastName = "User";
				eMail = "superadmin@localhost.com";
				backdoorRoles = ['admin', 'firstLogin'];
				isTestUser = true;
				break;
			case "editor":
				username = "editor";
				firstName = "Admin";
				lastName = "User";
				eMail = "admin@localhost.com";
				backdoorRoles = ['editor', 'firstLogin'];
				isTestUser = true;
				break;
			case "pro":
				username = "pro";
				firstName = "Pro";
				lastName = "User";
				eMail = "pro@localhost.com";
				backdoorRoles = ['pro', 'firstLogin'];
				isTestUser = true;
				break;
			case "lecturer":
				username = "lecturer";
				firstName = "Lecturer";
				lastName = "User";
				eMail = "lecturer@localhost.com";
				backdoorRoles = ['lecturer', 'firstLogin'];
				isTestUser = true;
				break;
			case "university":
				username = "university";
				firstName = "Edu";
				lastName = "User";
				eMail = "edu@localhost.com";
				backdoorRoles = ['university', 'firstLogin'];
				isTestUser = true;
				break;
			case "standard":
				username = "standard";
				firstName = "Standard";
				lastName = "User";
				eMail = "Standard@localhost.com";
				backdoorRoles = ['standard', 'firstLogin'];
				isTestUser = true;
				break;
			case "blocked":
				username = "blocked";
				firstName = "Blocked";
				lastName = "User";
				eMail = "Blocked@localhost.com";
				backdoorRoles = ['firstLogin'];
				isTestUser = true;
				break;
			case "firstLogin":
				username = "firstLogin";
				firstName = "";
				lastName = "";
				eMail = "";
				backdoorRoles = ['university', 'firstLogin'];
				isTestUser = true;
				break;
		}
		if (isTestUser) {
			Roles.addUsersToRoles(doc._id, backdoorRoles);
			Meteor.users.update(doc._id, {
				$set: {
					"profile.name": username,
					"profile.givenname": firstName,
					"profile.birthname": lastName,
					email: eMail
				}
			});
		}
	}
	Meteor.users.update(doc._id, {
		$set: {
			visible: false,
			lvl: 1,
			lastOnAt: new Date(),
			daysInRow: 0,
			selectedColorTheme: "default",
			mailNotification: ServerStyle.newUser("mail"),
			webNotification: ServerStyle.newUser("web"),
			"profile.locale": "de"
		}
	});
	if (doc.services !== undefined && doc.services.cas !== undefined) {
		Roles.addUsersToRoles(doc._id, [
			'standard',
			'university',
			'firstLogin'
		]);
	} else {
		Roles.addUsersToRoles(doc._id, ['standard', 'firstLogin']);
	}
	Meteor.call('updateCardsetCount', doc._id);
});

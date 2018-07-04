import {Cardsets} from "../../api/cardsets.js";
import {Cards} from "../../api/cards.js";
import {Leitner, Wozniak} from "../../api/learned";
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {CardVisuals} from "../../api/cardVisuals.js";


Router.route('/', function () {
	this.redirect('home');
});

Router.route('/admin', function () {
	this.redirect('admin_dashboard');
});

Router.configure({
	layoutTemplate: 'admin_main'
});

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/home', {
	name: 'home',
	template: 'welcome',
	data: function () {
		return Cardsets.findOne({_id: Session.get('wordcloudItem')});
	}
});

Router.route('about', {
	name: 'about',
	template: 'contact'
});

Router.route('learning', {
	name: 'learning',
	template: 'contact'
});

Router.route('help', {
	name: 'help',
	template: 'contact'
});

Router.route('faq', {
	name: 'faq',
	template: 'contact'
});

Router.route('impressum', {
	name: 'impressum',
	template: 'contact'
});

Router.route('demo', {
	name: 'demo',
	template: 'demo'
});

Router.route('demolist', {
	name: 'demolist',
	template: 'demo',
	data: function () {
		return Cardsets.findOne({kind: 'demo', shuffled: true});
	}
});

Router.route('agb', {
	name: 'agb',
	template: 'contact'
});

Router.route('datenschutz', {
	name: 'datenschutz',
	template: 'contact'
});

Router.route('/alldecks', {
	name: 'alldecks',
	template: 'cardsets'
});

Router.route('/create', {
	name: 'create',
	template: 'cardsets'
});

Router.route('/course', {
	name: 'courseIterations',
	template: 'CourseIterations'
});

Router.route('/learn', {
	name: 'learn',
	template: 'cardsets'
});

Router.route('/shuffle', {
	name: 'shuffle',
	template: 'cardsets'
});

Router.route('/cardset', function () {
	this.redirect('learn');
});

Router.route('/cardset/:_id', {
	name: 'cardsetdetailsid',
	template: 'cardsetAccess',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardset/:_id/card/:card_id', {
	name: 'cardsetcard',
	template: 'cardsetAccess',
	data: function () {
		Session.set('activeCard', this.params.card_id);
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardset/:_id/editshuffle', {
	name: 'editshuffle',
	template: 'shuffle',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardset/:_id/editors', {
	name: 'cardseteditors',
	template: 'cardsetManageEditors',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardset/:_id/stats', {
	name: 'cardsetstats',
	template: 'cardsetLearnActivityStatistic',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardsetlist', function () {
	this.redirect('create');
});

Router.route('/cardsetlist/:_id', {
	name: 'cardsetlistid',
	template: 'cardsetAccess',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/cardset/:_id/newcard', {
	name: 'newCard',
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		return cardset;
	}
});

Router.route('/cardset/:_id/editcard/:card_id', {
	name: 'editCard',
	data: function () {
		let card = Cards.findOne({_id: this.params.card_id});
		return card;
	}
});

Router.route('pool');

Router.route('/progress/:_id/:user_id', {
	name: 'progress',
	template: 'progress',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/box/:_id', {
	name: 'box',
	template: 'learnAlgorithmAccess',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/memo/:_id', {
	name: 'memo',
	template: 'learnAlgorithmAccess',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/presentationlist/:_id', {
	name: 'presentationlist',
	template: 'presentation',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/presentation/:_id', {
	name: 'presentation',
	template: 'presentation',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/profile/:_id/overview', {
	name: 'profileOverview',
	template: 'profile'
});
Router.route('/profile/:_id/billing', {
	name: 'profileBilling',
	template: 'profile'
});
Router.route('/profile/:_id/membership', {
	name: 'profileMembership',
	template: 'profile'
});
Router.route('/profile/:_id/notifications', {
	name: 'profileNotifications',
	template: 'profile'
});
Router.route('/profile/:_id/settings', {
	name: 'profileSettings',
	template: 'profile'
});
Router.route('/profile/:_id/requests', {
	name: 'profileRequests',
	template: 'profile'
});

Router.route('/admin/dashboard', {
	name: 'admin_dashboard',
	template: 'admin_dashboard',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/cardsets', {
	name: 'admin_cardsets',
	template: 'admin_cardsets',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/cardset/:_id', {
	name: 'admin_cardset',
	template: 'admin_cardset',
	layoutTemplate: 'admin_main',
	data: function () {
		return Cardsets.findOne({_id: this.params._id});
	}
});

Router.route('/admin/cards', {
	name: 'adminCards',
	template: 'admin_cards',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/card/:_id', {
	name: 'adminCard',
	template: 'admin_card',
	layoutTemplate: 'admin_main',
	data: function () {
		return Cards.findOne({_id: this.params._id});
	}
});

Router.route('/admin/users', {
	name: 'admin_users',
	template: 'admin_users',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/user/:_id', {
	name: 'admin_user',
	template: 'admin_user',
	layoutTemplate: 'admin_main',
	data: function () {
		return Meteor.users.findOne({_id: this.params._id});
	}
});

Router.route('/admin/learningStatistics', {
	name: 'admin_learningStatistics',
	template: 'admin_learningStatistics',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/notifications', {
	name: 'admin_notifications',
	template: 'admin_notifications',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/university', {
	name: 'admin_university',
	template: 'admin_university',
	layoutTemplate: 'admin_main'
});

Router.route('/admin/settings', {
	name: 'admin_settings',
	template: 'admin_settings',
	layoutTemplate: 'admin_main'
});


var isSignedIn = function () {
	CardVisuals.checkFullscreen();
	if (!(Meteor.user() || Meteor.loggingIn())) {
		Router.go('home');
	} else {
		TAPi18n.setLanguage(Meteor.user().profile.locale);
		Session.set('activeLanguage', Meteor.user().profile.locale);
		this.next();
	}
};

export function firstLoginBertAlert() {
	Meteor.subscribe("userData", {
		onReady: function () {
			let firstTimeLogin = 'displayedFirstLoginBertAlert';
			if (localStorage.getItem(firstTimeLogin) === "true") {
				Bert.defaults.hideDelay = 97200;
				Bert.alert({
					title: TAPi18n.__('bertAlert.firstLogin.title', {firstAppTitle: Meteor.settings.public.welcome.title.first, lastAppTitle: Meteor.settings.public.welcome.title.last}),
					message: TAPi18n.__('bertAlert.firstLogin.message', {lastAppTitle: Meteor.settings.public.welcome.title.last}),
					type: 'warning',
					style: 'growl-top-left',
					icon: 'fa-heart'
				});
				Bert.defaults.hideDelay = 7;
				localStorage.setItem(firstTimeLogin, "false");
			}
		}
	});
}

var goToCreated = function () {
	if (Meteor.user()) {
		if (!Roles.userIsInRole(Meteor.userId(), ['firstLogin'])) {
			firstLoginBertAlert();
		}
		if (Roles.userIsInRole(Meteor.userId(), ['admin', 'editor'])) {
			Router.go('alldecks');
		} else {
			let actualDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
			actualDate.setHours(0, 0, 0, 0);
			let count = Leitner.find({
				user_id: Meteor.userId(),
				active: true
			}).count() + Wozniak.find({
				user_id: Meteor.userId(), nextDate: {
					$lte: actualDate
				}
			}).count();
			if (count) {
				Router.go('learn');
			} else {
				Router.go('pool');
			}
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(isSignedIn, {
	except: [
		'home',
		'about',
		'learning',
		'faq',
		'help',
		'impressum',
		'demo',
		'demolist',
		'agb',
		'datenschutz'
	]
});

Router.onBeforeAction(goToCreated, {
	only: ['home']
});

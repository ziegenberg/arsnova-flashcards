import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import {Cards} from "../../api/subscriptions/cards.js";
import {Cardsets} from "../../api/subscriptions/cardsets.js";
import {Meteor} from "meteor/meteor";
import {Session} from "meteor/session";
import {CardVisuals} from "../../api/cardVisuals.js";
import {Route} from "../../api/route.js";
import {Filter} from "../../api/filter";
import {MarkdeepEditor} from "../../api/markdeepEditor";
import {WebPushNotifications} from "../../api/webPushSubscriptions";
import {UserPermissions} from "../../api/permissions";
import {MainNavigation} from "../../api/mainNavigation";
import {ServerStyle} from "../../api/styles.js";
import {LoginTasks} from "../../api/login";
import {AspectRatio} from "../../api/aspectRatio.js";
import {Leitner} from "../../api/subscriptions/leitner";
import {Wozniak} from "../../api/subscriptions/wozniak";
import * as RouteNames from "../../util/routeNames";

let mainTemplate = 'main';
let adminMainTemplate = 'admin_main';
let loadingScreenTemplate = 'loadingScreen';

FlowRouter.notFound = {
	action: function() {
		FlowRouter.go('home');
	}
};

FlowRouter.route('/admin', function () {
	FlowRouter.go('admin_dashboard');
});

FlowRouter.route('/firstLogin', {
	name: RouteNames.firstLogin,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/firstLogin/firstLogin.js'),
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.firstLogin',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		this.render(mainTemplate, 'firstLoginContent');
	}
});

FlowRouter.route('/accessDenied', {
	name: RouteNames.accessDenied,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/accessDenied/accessDenied.js'),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.accessDenied',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'accessDenied', data);
	}
});

FlowRouter.route('/', {
	name: RouteNames.home,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('wordcloudCardsets'),
			Meteor.subscribe('userDataLandingPage')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
		return Cardsets.findOne({_id: Session.get('wordcloudItem')});
	},
	action: function (params, qs, data) {
		CardVisuals.toggleFullscreen(true);
		this.render(mainTemplate, 'welcome', data);
	}
});

FlowRouter.route('/about', {
	name: RouteNames.about,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.about',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/learning', {
	name: RouteNames.learning,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.learn',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/help', {
	name: RouteNames.help,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.help',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/faq', {
	name: RouteNames.faq,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.faq',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/impressum', {
	name: RouteNames.impressum,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.legalNotice',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/demo', {
	name: RouteNames.demo,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/impressum/pages/demo/demo.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('demoCardsets'),
			Meteor.subscribe('demoCards')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.demo.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if(ServerStyle.gotDemoAutoFullscreen() && !CardVisuals.isFullscreen()) {
			setTimeout(function () {
				CardVisuals.toggleFullscreen();
			}, 1000);
		}
		this.render(mainTemplate, 'demo', data);
	}
});

FlowRouter.route('/demolist', {
	name: RouteNames.demolist,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/impressum/pages/demo/demo.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('demoCardsets'),
			Meteor.subscribe('demoCards')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.demo.index',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "cardsetIndex");
		return Cardsets.findOne({kind: 'demo', name: "DemoCardset", shuffled: true});
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'demo', data);
	}
});

FlowRouter.route('/agb', {
	name: RouteNames.agb,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.agb',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/datenschutz', {
	name: RouteNames.datenschutz,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import("../../ui/impressum/impressum.js"),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.welcome.privacyPolicy',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'contact', data);
	}
});

FlowRouter.route('/all/cardsets', {
	name: RouteNames.alldecks,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('allCardsets'),
			Meteor.subscribe('paidCardsets'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.all.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/all/repetitorien', {
	name: RouteNames.allRepetitorien,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('allRepetitorien'),
			Meteor.subscribe('paidCardsets'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.all.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	},
	triggersEnter: [
		(context, redirect) => {
			if (ServerStyle.gotSimplifiedNav()) {
				redirect(RouteNames.alldecks);
			}
		}
	]
});

FlowRouter.route('/personal/cardsets', {
	name: RouteNames.create,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('myCardsets')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.personal.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "create");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		if (ServerStyle.gotNavigationFeature("personal.cardset.enabled")) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/transcripts/personal', {
	name: RouteNames.transcriptsPersonal,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		if (ServerStyle.gotSimplifiedNav()) {
			return [
				import ('../../ui/cardset/index/transcript/transcript.js'),
				import('../../ui/filter/filter.js'),
				Meteor.subscribe('defaultAppData'),
				Meteor.subscribe('myTranscriptCards'),
				Meteor.subscribe('myTranscriptBonus'),
				Meteor.subscribe('cardsetsTranscripts')
			];
		} else {
			return [
				import ('../../ui/cardset/index/transcript/transcript.js'),
				import('../../ui/filter/filter.js'),
				Meteor.subscribe('defaultAppData'),
				Meteor.subscribe('myTranscriptCards')
			];
		}
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.transcripts.personal',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "transcripts");
			Session.set('cardsetIndexResults', Cards.find().count());
			Filter.resetMaxItemCounter();
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'filterIndex', data);
	}
});

FlowRouter.route('/transcripts/bonus', {
	name: RouteNames.transcriptsBonus,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import ('../../ui/cardset/index/transcript/transcript.js'),
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('myBonusTranscriptCards'),
			Meteor.subscribe('myTranscriptBonus'),
			Meteor.subscribe('cardsetsTranscripts')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.transcripts.bonus',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "transcripts");
			Session.set('cardsetIndexResults', Cards.find().count());
			Filter.resetMaxItemCounter();
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'filterIndex', data);
	},
	triggersEnter: [
		(context, redirect) => {
			if (ServerStyle.gotSimplifiedNav()) {
				redirect(RouteNames.transcriptsPersonal);
			}
		}
	]
});

FlowRouter.route('/personal/repetitorien', {
	name: RouteNames.personalRepetitorien,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('personalRepetitorien'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.personal.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "create");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		if (ServerStyle.gotNavigationFeature("personal.repetitorium.enabled")) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	},
	triggersEnter: [
		(context, redirect) => {
			if (ServerStyle.gotSimplifiedNav()) {
				redirect(RouteNames.create);
			}
		}
	]
});

FlowRouter.route('/public/cardsets', {
	name: RouteNames.pool,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('poolCardsets'),
			Meteor.subscribe('paidCardsets'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.public.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
	},
	action: function (params, qs, data) {
		if (ServerStyle.gotNavigationFeature("public.cardset.enabled")) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/public/repetitorien', {
	name: RouteNames.repetitorium,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('repetitoriumCardsets'),
			Meteor.subscribe('paidCardsets'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.public.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "repetitorium");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		if (ServerStyle.gotNavigationFeature("public.repetitorium.enabled")) {
			this.render(mainTemplate, 'filterIndex', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	},
	triggersEnter: [
		(context, redirect) => {
			if (ServerStyle.gotSimplifiedNav()) {
				redirect(RouteNames.pool);
			}
		}
	]
});

FlowRouter.route('/learn', {
	name: RouteNames.learn,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/filter/filter.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('workloadCardsets'),
			Meteor.subscribe('paidCardsets'),
			Meteor.subscribe('userWorkload'),
			Meteor.subscribe('userLeitner'),
			Meteor.subscribe('userWozniak'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.workload',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "workload");
		Session.set('cardsetIndexResults', Leitner.find().count() + Wozniak.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'filterIndex', data);
	}
});

FlowRouter.route('/cardset', function () {
	FlowRouter.go('learn');
});

FlowRouter.route('/cardset/:_id', {
	name: RouteNames.cardsetdetailsid,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetUserRating', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('cardsetWozniak', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			if (cardset.shuffled) {
				document.title = TAPi18n.__('title.cardset.rep',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			} else {
				document.title = TAPi18n.__('title.cardset.cardset',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			}
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', "cardset");
		Session.set('isNewCardset', false);
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetAccess', data);
	}
});

FlowRouter.route('/cardset/:_id/card/:card_id', {
	name: RouteNames.cardsetcard,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetUserRating', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('cardsetWozniak', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			if (cardset.shuffled) {
				document.title = TAPi18n.__('title.cardset.rep',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			} else {
				document.title = TAPi18n.__('title.cardset.cardset',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			}
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', "cardset");
		Session.set('isNewCardset', false);
		Session.set('activeCard', params._id);
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetAccess', data);
	}
});

FlowRouter.route('/cardset/:_id/editshuffle', {
	name: RouteNames.editshuffle,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('editShuffleCardsets', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined && cardset.shuffled) {
			document.title = TAPi18n.__('title.cardset.shuffle',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "shuffle");
		Filter.resetMaxItemCounter();
		Session.set('cardsetIndexResults', Cardsets.find().count());
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'filterIndexShuffle', data);
	}
});

FlowRouter.route('/cardset/:_id/transcripts/review', {
	name: RouteNames.presentationTranscriptReview,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetTranscriptBonusReview', params._id, Session.get('transcriptBonusReviewFilter')),
			Meteor.subscribe('cardsetTranscriptBonusCardsReview', params._id, Session.get('transcriptBonusReviewFilter')),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('userDataTranscriptBonus', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.stats.transcripts',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		MarkdeepEditor.changeMobilePreview(true);
		Filter.resetMaxItemCounter();
		Session.set('helpFilter', "cardset");
		Session.set('isNewCardset', false);
		Session.set('cardsetIndexResults', Cards.find().count());
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});

FlowRouter.route('/cardset/:_id/transcripts', {
	name: RouteNames.transcriptBonus,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetTranscriptBonus', params._id),
			Meteor.subscribe('cardsetTranscriptBonusCards', params._id),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('userDataTranscriptBonus', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.stats.transcripts',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Filter.resetMaxItemCounter();
		Session.set('helpFilter', "cardset");
		Session.set('isNewCardset', false);
		Session.set('cardsetIndexResults', Cards.find().count());
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetIndexTranscript', data);
	}
});

FlowRouter.route('/cardset/:_id/editors', {
	name: RouteNames.cardseteditors,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			if (cardset.shuffled) {
				document.title = TAPi18n.__('title.cardset.rep',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			} else {
				document.title = TAPi18n.__('title.cardset.cardset',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			}
		}
		Session.set('helpFilter', "cardset");
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetManageEditors', data);
	}
});

FlowRouter.route('/cardset/:_id/stats', {
	name: RouteNames.cardsetstats,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('cardsetUserRating', params._id),
			Meteor.subscribe('cardsetWorkload', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.stats.leitner',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "bonusStatistics");
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetLearnActivityStatistic', data);
	}
});

FlowRouter.route('/cardsetlist', function () {
	FlowRouter.go('create');
});

FlowRouter.route('/cardsetlist/:_id', {
	name: RouteNames.cardsetlistid,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/cardset/cardset.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetUserRating', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('cardsetWozniak', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			if (cardset.shuffled) {
				document.title = TAPi18n.__('title.cardset.index.rep',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			} else {
				document.title = TAPi18n.__('title.cardset.index.cardset',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			}
		}
		Session.set('helpFilter', "cardsetIndex");
		Session.set('isNewCardset', false);
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'cardsetAccess', data);
	}
});

FlowRouter.route('/cardset/:_id/newcard', {
	name: RouteNames.newCard,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/card/editor/editor.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetsEditMode', params._id),
			Meteor.subscribe('cardsetCards', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.newCard',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "cardEditor");
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'newCard', data);
	}
});

FlowRouter.route('/cardset/:_id/editcard/:card_id', {
	name: RouteNames.editCard,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/card/editor/editor.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetsEditMode', params._id),
			Meteor.subscribe('cardsetCards', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.editCard',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "cardEditor");
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'editCard', data);
	}
});

FlowRouter.route('/personal/transcripts/edit/:card_id', {
	name: RouteNames.editTranscript,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/card/editor/editor.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetsTranscripts'),
			Meteor.subscribe('transcriptCard', params.card_id),
			Meteor.subscribe('myTranscriptBonus')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.edit',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "cardEditor");
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'editCard', data);
	}
});


FlowRouter.route('/personal/transcripts/new', {
	name: RouteNames.newTranscript,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/card/editor/editor.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardsetsTranscripts'),
			Meteor.subscribe('userDataLecturers')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.new',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "cardEditor");
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'newCard', data);
	}
});

FlowRouter.route('/box/:_id', {
	name: RouteNames.box,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/learn/learn.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('cardsetLeitner', params._id),
			Meteor.subscribe('latestLeitnerCardsetTask', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.leitner',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'learnAlgorithmAccess', data);
	}
});

FlowRouter.route('/memo/:_id', {
	name: RouteNames.memo,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/learn/learn.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('cardsetWozniak', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.wozniak',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'learnAlgorithmAccess', data);
	}
});

FlowRouter.route('/presentationlist/:_id', {
	name: RouteNames.presentationlist,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			if (cardset.shuffled) {
				document.title = TAPi18n.__('title.cardset.index.rep',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			} else {
				document.title = TAPi18n.__('title.cardset.index.cardset',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
			}
		}
		Session.set('helpFilter', "cardsetIndex");
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});

FlowRouter.route('/presentation/transcripts/:card_id', {
	name: RouteNames.presentationTranscriptPersonal,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('transcriptCard', params.card_id)
		];
	},
	data: function (params) {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(params.card_id);
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});

FlowRouter.route('/presentation/transcripts/bonus/:card_id', {
	name: RouteNames.presentationTranscriptBonus,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('transcriptCard', params.card_id),
			Meteor.subscribe('myTranscriptBonus'),
			Meteor.subscribe('cardsetTranscriptMyBonus', params.card_id)
		];
	},
	data: function (params) {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(params.card_id);
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});


FlowRouter.route('/presentation/transcripts/bonus/:_id/:card_id', {
	name: RouteNames.presentationTranscriptBonusCardset,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('transcriptCard', params.card_id),
			Meteor.subscribe('cardsetTranscriptBonus', params._id)
		];
	},
	data: function (params) {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(params.card_id);
		} else {
			FlowRouter.go('home');
		}
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});

FlowRouter.route('/presentation/:_id', {
	name: RouteNames.presentation,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function (params) {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('cardset', params._id),
			Meteor.subscribe('paidCardset', params._id),
			Meteor.subscribe('cardsetWorkload', params._id),
			Meteor.subscribe('cardsetCards', params._id)
		];
	},
	data: function (params) {
		let cardset = Cardsets.findOne({_id: params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.presentation',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		return cardset;
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'presentation', data);
	}
});

FlowRouter.route('/makingofcards', {
	name: RouteNames.making,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('makingOfCardsets'),
			Meteor.subscribe('demoCards')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		return Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true});
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'makingOfCards', data);
	}
});

FlowRouter.route('/makingofcardslist', {
	name: RouteNames.makinglist,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/presentation/presentation.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('makingOfCardsets'),
			Meteor.subscribe('demoCards')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "cardsetIndex");
		return Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true});
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'makingOfCards', data);
	}
});

FlowRouter.route('/profile/:_id/billing', {
	name: RouteNames.profileBilling,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/profile/profile.js'),
			import('../../ui/profile/view/billing.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('paidCardsets')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.profile.billing',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "billing");
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'profile', data);
	}
});
FlowRouter.route('/profile/:_id/membership', {
	name: RouteNames.profileMembership,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/profile/profile.js'),
			import('../../ui/profile/view/membership.js'),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.profile.membership',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "membership");
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'profile', data);
	}
});
FlowRouter.route('/profile/:_id/notifications', {
	name: RouteNames.profileNotifications,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/profile/profile.js'),
			import('../../ui/profile/view/notifications.js'),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "notifications");
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'profile', data);
	}
});
FlowRouter.route('/profile/:_id/settings', {
	name: RouteNames.profileSettings,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/profile/profile.js'),
			import('../../ui/profile/view/settings.js'),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.profile.settings',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "settings");
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'profile', data);
	}
});
FlowRouter.route('/profile/:_id/requests', {
	name: RouteNames.profileRequests,
	whileWaiting: function () {
		this.render(mainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/profile/profile.js'),
			import('../../ui/profile/view/requests.js'),
			Meteor.subscribe('defaultAppData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "requests");
	},
	action: function (params, qs, data) {
		this.render(mainTemplate, 'profile', data);
	}
});

FlowRouter.route('/admin/dashboard', {
	name: RouteNames.admin_dashboard,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/dashboard/dashboard.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe("serverInventory"),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.dashboard',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_dashboard', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/users', {
	name: RouteNames.admin_users,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/users/index.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.user.index',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_users', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/user/:_id', {
	name: RouteNames.admin_user,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/users/user.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function (params) {
		document.title = TAPi18n.__('title.backend.user.user',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
		return Meteor.users.findOne({_id: params._id});
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_user', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/learningStatistics', {
	name: RouteNames.admin_learningStatistics,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/learningStatistics/learningStatistics.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.stats',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_learningStatistics', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/matomoStatistics', {
	name: RouteNames.admin_matomoStatistics,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/matomo/matomoStatistics.js')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.matomo',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_matomoStatistics', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go(adminMainTemplate, 'home');
		}
	}
});

FlowRouter.route('/admin/apiAccess', {
	name: RouteNames.admin_apiAccess,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/apiAccess/apiAccess.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('allCardsets'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.api',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_apiAccess', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/notifications', {
	name: RouteNames.admin_notifications,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/notifications/notifications.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.notifications',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_notifications', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/university', {
	name: RouteNames.admin_university,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/university/university.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_university', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

FlowRouter.route('/admin/settings', {
	name: RouteNames.admin_settings,
	whileWaiting: function () {
		this.render(adminMainTemplate, loadingScreenTemplate);
	},
	waitOn: function () {
		return [
			import('../../ui/admin/settings/settings.js'),
			Meteor.subscribe('defaultAppData'),
			Meteor.subscribe('userData')
		];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend.settings',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function (params, qs, data) {
		WebPushNotifications.subscribeForPushNotification();
		if (UserPermissions.isAdmin()) {
			this.render(adminMainTemplate, 'admin_settings', data);
		} else {
			MainNavigation.setLoginTarget(false);
			FlowRouter.go('home');
		}
	}
});

/**
 * onBeforeAction
 */


var linksWithNoLoginRequirement = function () {
	let links = [
		RouteNames.home,
		RouteNames.about,
		RouteNames.learning,
		RouteNames.faq,
		RouteNames.help,
		RouteNames.impressum,
		RouteNames.demo,
		RouteNames.demolist,
		RouteNames.agb,
		RouteNames.datenschutz,
		RouteNames.making,
		RouteNames.makinglist
	];
	if (ServerStyle.isLoginEnabled("guest") && MainNavigation.isGuestLoginActive()) {
		let linksGuest = [
			RouteNames.cardsetdetailsid,
			RouteNames.cardsetcard,
			RouteNames.cardsetlistid,
			RouteNames.presentation,
			RouteNames.presentationlist
		];
		if (ServerStyle.gotNavigationFeature("public.cardset.enabled")) {
			linksGuest.push('pool');
		}
		if (ServerStyle.gotNavigationFeature("public.repetitorium.enabled")) {
			linksGuest.push('repetitorium');
		}
		return links.concat(linksGuest);
	} else {
		MainNavigation.setGuestLogin("false");
		return links;
	}
};

export let setLanguage = function () {
	let language = ServerStyle.getClientLanguage();
	Session.set('activeLanguage', language);
	TAPi18n.setLanguage(language);
};

function setBackground (backgroundObject, cssClass = undefined) {
	let body = $('body');
	body.removeAttr('class');
	body.removeAttr('style');
	if (cssClass !== undefined) {
		body.addClass(cssClass);
	}
	for (let i = 0; i < Object.keys(backgroundObject).length; i++) {
		let key = Object.keys(backgroundObject)[i];
		body.css(key, backgroundObject[key]);
	}
}

function landingPageBackgrounds () {
	if (Route.isDemo() | Route.isMakingOf()) {
		if (Route.isPresentationViewList()) {
			setBackground(ServerStyle.getBackground("demoIndex"), 'presentation-list');
		} else {
			setBackground(ServerStyle.getBackground("demo"), 'demo');
		}
	} else if (Route.isAGB()) {
		setBackground(ServerStyle.getBackground("agb"));
	} else if (Route.isDatenschutz()) {
		setBackground(ServerStyle.getBackground("datenschutz"));
	} else if (Route.isImpressum()) {
		setBackground(ServerStyle.getBackground("impressum"));
	} else if (Route.isAbout()) {
		setBackground(ServerStyle.getBackground("about"));
	} else if (Route.isLearning()) {
		setBackground(ServerStyle.getBackground("learning"));
	} else if (Route.isFaq()) {
		setBackground(ServerStyle.getBackground("faq"));
	} else if (Route.isHelp()) {
		setBackground(ServerStyle.getBackground("help"));
	} else {
		setBackground(ServerStyle.getBackground("landing-page"));
	}
}

export let setTheme = function () {
	if (Meteor.user()) {
		// If there is no selectedColorTheme the Session var "theme" will stay NULL.
		if (Meteor.users.findOne(Meteor.userId())) {
			if (Meteor.users.findOne(Meteor.userId()).selectedColorTheme) {
				Session.set("theme", ServerStyle.getDefaultTheme());
			}
		}
	} else {
		// When user logged out, go back to default Theme
		Session.set("theme", ServerStyle.getDefaultTheme());
	}
	let themeId = "";
	if (Meteor.user() || MainNavigation.isGuestLoginActive()) {
		if (Session.get('fullscreen') && !Route.isPresentationList()) {
			themeId = 'theme-wrapper-no-nav';
		} else {
			themeId = 'theme-wrapper';
		}
	} else {
		if (!Session.get('fullscreen') && !Route.isPresentationList()) {
			themeId = 'theme-wrapper-no-nav-welcome';
		} else {
			themeId = 'theme-wrapper-no-nav';
		}
	}
	let html = $('html');
	if (Route.isCardset()) {
		themeId = 'theme-wrapper-cardset';
	}
	html.attr('id', themeId);
	html.attr('class', Session.get("theme"));

	//Background
	if (Route.isLandingPageRoutes()) {
		landingPageBackgrounds();
	} else if (Meteor.user() || MainNavigation.isGuestLoginActive()) {
		if (Route.isBackend()) {
			setBackground(ServerStyle.getBackground("backend"), 'backend');
		} else {
			let internal = 'internal';
			if (Route.isProfile()) {
				if (Route.isProfileSettings()) {
					setBackground(ServerStyle.getBackground("profileSettings"), internal);
				} else if (Route.isProfileMembership())  {
					setBackground(ServerStyle.getBackground("profileMembership"), internal);
				} else if (Route.isProfileRequests()) {
					setBackground(ServerStyle.getBackground("profileRequests"), internal);
				} else {
					setBackground(ServerStyle.getBackground("profileBilling"), internal);
				}
			} else if (Route.isPublic()) {
				setBackground(ServerStyle.getBackground("pool"), internal);
			} else if (Route.isWorkload()) {
				setBackground(ServerStyle.getBackground("workload"), internal);
			} else if (Route.isPersonal()) {
				setBackground(ServerStyle.getBackground("personal"), internal);
			} else if (Route.isMyTranscripts() || Route.isMyBonusTranscripts()) {
				setBackground(ServerStyle.getBackground("transcripts"), internal);
			} else if (Route.isAll()) {
				setBackground(ServerStyle.getBackground("allPool"), internal);
			} else if (Route.isCardset()) {
				setBackground(ServerStyle.getBackground("cardset"), internal);
			} else if (Route.isCardsetLeitnerStats()) {
				setBackground(ServerStyle.getBackground("cardsetLeitnerStats"), internal);
			} else if (Route.isTranscriptBonus()) {
				setBackground(ServerStyle.getBackground("cardsetTranscriptBonus"), internal);
			} else if (Route.isPresentation()) {
				if (Route.isPresentationViewList()) {
					setBackground(ServerStyle.getBackground("presentationIndex"), 'presentation-list');
				} else {
					setBackground(ServerStyle.getBackground("presentation"), 'presentation');
				}
			} else if (Route.isBox() || Route.isMemo()) {
				let learning = 'learning';
				if (Route.isBox()) {
					setBackground(ServerStyle.getBackground("leitner"), learning);
				} else {
					setBackground(ServerStyle.getBackground("wozniak"), learning);
				}
			} else if (Route.isEditMode()) {
				setBackground(ServerStyle.getBackground("editor"), 'editor');
			} else if (Route.isLandingPageRoutes()) {
				landingPageBackgrounds(ServerStyle.getBackground("internal"), internal);
			} else {
				setBackground(ServerStyle.getBackground("internal"), internal);
			}
		}
	} else {
		let landingPage;
		if (!Route.isLandingPageRoutes()) {
			landingPage = 'landing-page';
		}
		setBackground(ServerStyle.getBackground("landing-page"), landingPage);
	}
};

var isSignedIn = function () {
	CardVisuals.checkFullscreen();
	if (!(Meteor.user() || Meteor.loggingIn()) && !MainNavigation.isGuestLoginActive()) {
		Session.set("theme", ServerStyle.getDefaultTheme());
		if (MainNavigation.getLoginTarget() === undefined) {
			if (linksWithNoLoginRequirement().includes(FlowRouter.getRouteName())) {
				MainNavigation.setLoginTarget(false);
			} else {
				if (FlowRouter.getRouteName() !== 'firstLogin' && FlowRouter.getRouteName() !== 'accessDenied') {
					MainNavigation.setLoginTarget(FlowRouter.current().path);
				} else {
					MainNavigation.setLoginTarget(false);
				}
			}
		}
		FlowRouter.go('home');
	} else {
		Route.setFirstTimeVisit();
		if (Roles.userIsInRole(Meteor.userId(), ['firstLogin'])) {
			FlowRouter.go('firstLogin');
		}
		if (Roles.userIsInRole(Meteor.userId(), ['blocked'])) {
			FlowRouter.go('accessDenied');
		}
	}
};

export let setLoginTarget = function () {
	if (Meteor.user() || MainNavigation.isGuestLoginActive()) {
		if (!Roles.userIsInRole(Meteor.userId(), ['firstLogin', 'blocked']) && MainNavigation.getLoginTarget() !== undefined && MainNavigation.getLoginTarget() !== false && MainNavigation.getLoginTarget() !== "/") {
			FlowRouter.go(MainNavigation.getLoginTarget());
			MainNavigation.setLoginTarget(false);
		} else {
			LoginTasks.setLoginRedirect();
		}
	}
};

FlowRouter.triggers.enter([setLanguage, setTheme]);

FlowRouter.triggers.exit( function (context) {
	Session.set('previousRouteName', context.route.name);
});

FlowRouter.triggers.enter([isSignedIn], {
	except: linksWithNoLoginRequirement()
});

FlowRouter.triggers.enter([setLoginTarget], {
	only: [RouteNames.home]
});

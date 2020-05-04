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

let loadingScreenTemplate = 'loadingScreen';

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

Router.route('/firstLogin', {
	name: 'firstLogin',
	template: 'firstLoginContent',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/accessDenied', {
	name: 'accessDenied',
	template: 'accessDenied',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/home', {
	name: 'home',
	template: 'welcome',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('wordcloudCardsets'), Meteor.subscribe('userDataLandingPage')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
		return Cardsets.findOne({_id: Session.get('wordcloudItem')});
	},
	action: function () {
		if (this.ready()) {
			CardVisuals.toggleFullscreen(true);
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('about', {
	name: 'about',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('learning', {
	name: 'learning',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('help', {
	name: 'help',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('faq', {
	name: 'faq',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('impressum', {
	name: 'impressum',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('demo', {
	name: 'demo',
	template: 'demo',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('demoCardsets'), Meteor.subscribe('demoCards')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('demolist', {
	name: 'demolist',
	template: 'demo',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('demoCardsets'), Meteor.subscribe('demoCards')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "cardsetIndex");
		return Cardsets.findOne({kind: 'demo', name: "DemoCardset", shuffled: true});
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('agb', {
	name: 'agb',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('datenschutz', {
	name: 'datenschutz',
	template: 'contact',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/all/cardsets', {
	name: 'alldecks',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('allCardsets'), Meteor.subscribe('paidCardsets'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.all.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/all/repetitorien', {
	name: 'allRepetitorien',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('allRepetitorien'), Meteor.subscribe('paidCardsets'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.all.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/personal/cardsets', {
	name: 'create',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('myCardsets')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.personal.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "create");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			if (ServerStyle.gotNavigationFeature("personal.cardset.enabled")) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/transcripts/personal', {
	name: 'transcriptsPersonal',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('myTranscriptCards')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.transcripts.personal',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "transcripts");
			Session.set('cardsetIndexResults', Cards.find().count());
			Filter.resetMaxItemCounter();
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/transcripts/bonus', {
	name: 'transcriptsBonus',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('myBonusTranscriptCards'), Meteor.subscribe('myTranscriptBonus'), Meteor.subscribe('cardsetsTranscripts')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.transcripts.bonus',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "transcripts");
			Session.set('cardsetIndexResults', Cards.find().count());
			Filter.resetMaxItemCounter();
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/personal/repetitorien', {
	name: 'personalRepetitorien',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('personalRepetitorien'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.personal.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "create");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			if (ServerStyle.gotNavigationFeature("personal.repetitorium.enabled")) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/public/repetitorien', {
	name: 'repetitorium',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('repetitoriumCardsets'), Meteor.subscribe('paidCardsets'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.public.rep',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "repetitorium");
		Session.set('cardsetIndexResults', Cardsets.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			if (ServerStyle.gotNavigationFeature("public.repetitorium.enabled")) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/learn', {
	name: 'learn',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('workloadCardsets'), Meteor.subscribe('paidCardsets'), Meteor.subscribe('userWorkload'), Meteor.subscribe('userLeitner'), Meteor.subscribe('userWozniak'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.workload',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "workload");
		Session.set('cardsetIndexResults', Leitner.find().count() + Wozniak.find().count());
		Filter.resetMaxItemCounter();
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset', function () {
	this.redirect('learn');
});

Router.route('/cardset/:_id', {
	name: 'cardsetdetailsid',
	template: 'cardsetAccess',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetUserRating', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('cardsetWozniak', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/card/:card_id', {
	name: 'cardsetcard',
	template: 'cardsetAccess',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetUserRating', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('cardsetWozniak', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
		Session.set('activeCard', this.params.card_id);
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/editshuffle', {
	name: 'editshuffle',
	template: 'filterIndexShuffle',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('editShuffleCardsets', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined && cardset.shuffled) {
			document.title = TAPi18n.__('title.cardset.shuffle',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "shuffle");
		Filter.resetMaxItemCounter();
		Session.set('cardsetIndexResults', Cardsets.find().count());
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/transcripts/review', {
	name: 'presentationTranscriptReview',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetTranscriptBonusReview', this.params._id, Session.get('transcriptBonusReviewFilter')), Meteor.subscribe('cardsetTranscriptBonusCardsReview', this.params._id, Session.get('transcriptBonusReviewFilter')), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('userDataTranscriptBonus', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/transcripts', {
	name: 'transcriptBonus',
	template: 'cardsetIndexTranscript',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetTranscriptBonus', this.params._id), Meteor.subscribe('cardsetTranscriptBonusCards', this.params._id), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('userDataTranscriptBonus', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/editors', {
	name: 'cardseteditors',
	template: 'cardsetManageEditors',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/stats', {
	name: 'cardsetstats',
	template: 'cardsetLearnActivityStatistic',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('cardsetUserRating', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.stats.leitner',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "bonusStatistics");
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardsetlist', function () {
	this.redirect('create');
});

Router.route('/cardsetlist/:_id', {
	name: 'cardsetlistid',
	template: 'cardsetAccess',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetUserRating', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('cardsetWozniak', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/newcard', {
	name: 'newCard',
	template: 'newCard',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetsEditMode', this.params._id), Meteor.subscribe('cardsetCards', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.newCard',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "cardEditor");
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});


Router.route('/personal/transcripts/new', {
	name: 'newTranscript',
	template: 'newCard',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetsTranscripts'), Meteor.subscribe('userDataLecturers')];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.new',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "cardEditor");
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/cardset/:_id/editcard/:card_id', {
	name: 'editCard',
	template: 'editCard',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetsEditMode', this.params._id), Meteor.subscribe('cardsetCards', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.editCard',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "cardEditor");
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/personal/transcripts/edit/:card_id', {
	name: 'editTranscript',
	template: 'editCard',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardsetsTranscripts'), Meteor.subscribe('transcriptCard', this.params.card_id), Meteor.subscribe('myTranscriptBonus')];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.edit',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter', "cardEditor");
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/public/cardsets', {
	name: 'pool',
	template: 'filterIndex',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('poolCardsets'), Meteor.subscribe('paidCardsets'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.filter.public.cardset',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "pool");
		Session.set('cardsetIndexResults', Cardsets.find().count());
	},
	action: function () {
		if (this.ready()) {
			if (ServerStyle.gotNavigationFeature("public.cardset.enabled")) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/progress/:_id/:user_id', {
	name: 'progress',
	template: 'progress',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('userCardsetLeitner', this.params._id, this.params.user_id), Meteor.subscribe('userDataBonus', this.params._id, this.params.user_id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.progress',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		Session.set('helpFilter', "workloadProgress");
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/box/:_id', {
	name: 'box',
	template: 'learnAlgorithmAccess',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('cardsetLeitner', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.leitner',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/memo/:_id', {
	name: 'memo',
	template: 'learnAlgorithmAccess',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('cardsetWozniak', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.wozniak',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		Session.set('aspectRatioMode', AspectRatio.getDefault());
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/presentationlist/:_id', {
	name: 'presentationlist',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id), Meteor.subscribe('userData')];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
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
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/presentation/transcripts/:card_id', {
	name: 'presentationTranscriptPersonal',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('transcriptCard', this.params.card_id)];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(this.params.card_id);
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/presentation/transcripts/bonus/:card_id', {
	name: 'presentationTranscriptBonus',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('transcriptCard', this.params.card_id), Meteor.subscribe('myTranscriptBonus'), Meteor.subscribe('cardsetTranscriptMyBonus', this.params.card_id)];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(this.params.card_id);
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});


Router.route('/presentation/transcripts/bonus/:_id/:card_id', {
	name: 'presentationTranscriptBonusCardset',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('transcriptCard', this.params.card_id), Meteor.subscribe('cardsetTranscriptBonus', this.params._id)];
	},
	data: function () {
		document.title = TAPi18n.__('title.transcript.presentation',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		if (ServerStyle.gotTranscriptsEnabled()) {
			Session.set('helpFilter',undefined);
			return Cards.findOne(this.params.card_id);
		} else {
			Router.go('home');
		}
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/presentation/:_id', {
	name: 'presentation',
	template: 'presentation',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('cardset', this.params._id), Meteor.subscribe('paidCardset', this.params._id), Meteor.subscribe('cardsetWorkload', this.params._id), Meteor.subscribe('cardsetCards', this.params._id)];
	},
	data: function () {
		let cardset = Cardsets.findOne({_id: this.params._id});
		if (cardset !== undefined) {
			document.title = TAPi18n.__('title.cardset.presentation',  {app: ServerStyle.getAppTitle(), name: cardset.name}, ServerStyle.getServerLanguage());
		}
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		return cardset;
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('makingofcards', {
	name: 'making',
	template: 'makingOfCards',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('makingOfCardsets'), Meteor.subscribe('demoCards')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		MarkdeepEditor.changeMobilePreview(true);
		Session.set('helpFilter', undefined);
		return Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true});
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('makingofcardslist', {
	name: 'makinglist',
	template: 'makingOfCards',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('makingOfCardsets'), Meteor.subscribe('demoCards')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "cardsetIndex");
		return Cardsets.findOne({kind: 'demo', name: "MakingOfCardset", shuffled: true});
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/profile/:_id/overview', {
	name: 'profileOverview',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('workloadCardsets'), Meteor.subscribe('userWorkload'), Meteor.subscribe('userLeitner')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "summativeProgress");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});
Router.route('/profile/:_id/billing', {
	name: 'profileBilling',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('paidCardsets')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "billing");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});
Router.route('/profile/:_id/membership', {
	name: 'profileMembership',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "membership");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});
Router.route('/profile/:_id/notifications', {
	name: 'profileNotifications',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "notifications");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});
Router.route('/profile/:_id/settings', {
	name: 'profileSettings',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "settings");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});
Router.route('/profile/:_id/requests', {
	name: 'profileRequests',
	template: 'profile',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.default',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', "requests");
	},
	action: function () {
		if (this.ready()) {
			this.render();
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/dashboard', {
	name: 'admin_dashboard',
	template: 'admin_dashboard',
	layoutTemplate: 'admin_main',
	loadingTemplate: 'admin_dashboard',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe("serverInventory"), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/users', {
	name: 'admin_users',
	template: 'admin_users',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/user/:_id', {
	name: 'admin_user',
	template: 'admin_user',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
		return Meteor.users.findOne({_id: this.params._id});
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/learningStatistics', {
	name: 'admin_learningStatistics',
	template: 'admin_learningStatistics',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('allCardsets'), Meteor.subscribe('allLeitner'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/matomoStatistics', {
	name: 'admin_matomoStatistics',
	template: 'admin_matomoStatistics',
	layoutTemplate: 'admin_main',
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/apiAccess', {
	name: 'admin_apiAccess',
	template: 'admin_apiAccess',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('allCardsets'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/notifications', {
	name: 'admin_notifications',
	template: 'admin_notifications',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/university', {
	name: 'admin_university',
	template: 'admin_university',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

Router.route('/admin/settings', {
	name: 'admin_settings',
	template: 'admin_settings',
	layoutTemplate: 'admin_main',
	subscriptions: function () {
		return [Meteor.subscribe('defaultAppData'), Meteor.subscribe('userData')];
	},
	data: function () {
		document.title = TAPi18n.__('title.backend',  {app: ServerStyle.getAppTitle()}, ServerStyle.getServerLanguage());
		Session.set('helpFilter', undefined);
	},
	action: function () {
		if (this.ready()) {
			WebPushNotifications.subscribeForPushNotification();
			if (UserPermissions.isAdmin()) {
				this.render();
			} else {
				MainNavigation.setLoginTarget(false);
				this.redirect('home');
			}
		} else {
			this.render(loadingScreenTemplate);
		}
	}
});

/**
 * onBeforeAction
 */


var linksWithNoLoginRequirement = function () {
	let links = [
		'home',
		'about',
		'learning',
		'faq',
		'help',
		'impressum',
		'demo',
		'demolist',
		'agb',
		'datenschutz',
		'making',
		'makinglist'
	];
	if (ServerStyle.isLoginEnabled("guest") && MainNavigation.isGuestLoginActive()) {
		let linksGuest = [
			'cardsetdetailsid',
			'cardsetlist',
			'cardsetcard',
			'cardsetlistid',
			'presentation',
			'presentationlist'
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

var setLanguage = function () {
	let language = ServerStyle.getClientLanguage();
	Session.set('activeLanguage', language);
	TAPi18n.setLanguage(language);
	this.next();
};

var setTheme = function () {
	if (Meteor.user()) {
		// If there is no selectedColorTheme the Session var "theme" will stay NULL.
		if (Meteor.users.findOne(Meteor.userId())) {
			if (Meteor.users.findOne(Meteor.userId()).selectedColorTheme) {
				Session.set("theme", Meteor.users.findOne(Meteor.userId()).selectedColorTheme);
			}
		}
	} else {
		// When user logged out, go back to default Theme
		Session.set('theme', "default");
	}
	let themeId = "";
	let themeClass = "theme-";
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
	if (Session.get('theme')) {
		themeClass += "default";
	}
	let html = $('html');
	if (Route.isCardset()) {
		themeId = 'theme-wrapper-cardset';
	}
	html.attr('id', themeId);
	html.attr('class', themeClass);

	//Background
	let body = $('body');
	body.removeAttr('class');
	body.removeAttr('style');
	if (Route.isPresentationViewList()) {
		body.addClass('presentation-list');
		body.css('background-image', ServerStyle.getBackground("presentation"));
	} else if (Route.isPresentation()) {
		body.addClass('presentation');
		body.css('background-image', ServerStyle.getBackground("presentation"));
	} else if (Route.isBox() || Route.isMemo()) {
		body.addClass('learning');
		body.css('background-image', ServerStyle.getBackground("learning"));
	} else if (Route.isEditMode()) {
		body.addClass('editor');
		body.css('background-image', ServerStyle.getBackground("editor"));
	} else if (Route.isTranscriptBonus()) {
		body.addClass('transcriptBonus');
		body.css('background-image', ServerStyle.getBackground("transcriptBonus"));
	} else if (Route.isDemo() | Route.isMakingOf()) {
		body.addClass('demo');
		body.css('background-image', ServerStyle.getBackground("demo"));
	} else if (Meteor.user() || MainNavigation.isGuestLoginActive()) {
		if (Route.isBackend()) {
			body.addClass('backend');
			body.css('background-image', ServerStyle.getBackground("backend"));
		} else {
			body.addClass('internal');
			body.css('background-image', ServerStyle.getBackground("internal"));
		}
	} else {
		if (!Route.isImpressum()) {
			body.addClass('landing-page');
		}
		body.css('background-image', ServerStyle.getBackground("landing-page"));
	}
	this.next();
};

var isSignedIn = function () {
	CardVisuals.checkFullscreen();
	if (!(Meteor.user() || Meteor.loggingIn()) && !MainNavigation.isGuestLoginActive()) {
		Session.set('theme', "default");
		if (MainNavigation.getLoginTarget() === undefined) {
			if (linksWithNoLoginRequirement().includes(Router.current().route.getName())) {
				MainNavigation.setLoginTarget(false);
			} else {
				if (Router.current().route.getName() !== 'firstLogin' && Router.current().route.getName() !== 'accessDenied') {
					MainNavigation.setLoginTarget(Router.current().url);
				} else {
					MainNavigation.setLoginTarget(false);
				}
			}
		}
		Router.go('home');
	} else {
		Route.setFirstTimeVisit();
		if (Roles.userIsInRole(Meteor.userId(), ['firstLogin'])) {
			Router.go('firstLogin');
		}
		if (Roles.userIsInRole(Meteor.userId(), ['blocked'])) {
			Router.go('accessDenied');
		}
		this.next();
	}
};

var goToCreated = function () {
	if (Meteor.user() || MainNavigation.isGuestLoginActive()) {
		if (!Roles.userIsInRole(Meteor.userId(), ['firstLogin', 'blocked']) && MainNavigation.getLoginTarget() !== undefined && MainNavigation.getLoginTarget() !== false && MainNavigation.getLoginTarget() !== "/") {
			Router.go(MainNavigation.getLoginTarget());
			MainNavigation.setLoginTarget(false);
		} else {
			LoginTasks.setLoginRedirect();
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(setLanguage);

Router.onBeforeAction(setTheme);

Router.onBeforeAction(isSignedIn, {
	except: linksWithNoLoginRequirement()
});

Router.onBeforeAction(goToCreated, {
	only: ['home']
});

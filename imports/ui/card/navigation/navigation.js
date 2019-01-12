import {Session} from "meteor/session";
import {CardVisuals} from "../../../api/cardVisuals";
import {Route} from "../../../api/route";
import {CardType} from "../../../api/cardTypes";
import {CardNavigation} from "../../../api/cardNavigation";
import "./navigation.html";
import {Cards} from "../../../api/cards";

/*
 * ############################################################################
 * cardNavigation
 * ############################################################################
 */

Template.cardNavigation.helpers({
	isNavigationVisible: function () {
		return CardNavigation.isVisible();
	},
	isLearningMode: function () {
		return (Route.isMemo() || Route.isBox());
	},
	isQuestionSide: function () {
		return Session.get('isQuestionSide');
	}
});

Template.cardNavigation.onCreated(function () {
	if (Session.get('fullscreen') && !Route.isPresentationOrDemo()) {
		CardVisuals.toggleFullscreen();
	}
	CardNavigation.setActiveCardData(undefined, true);
	CardNavigation.toggleVisibility(true);
});

/*
 * ############################################################################
 * cardNavigationEnabled
 * ############################################################################
 */

Template.cardNavigationEnabled.events({
	'click .switchCardSide': function (event) {
		CardNavigation.switchCardSide($(event.target).data('content-id'), ($(event.target).data('navigation-id') + 1), $(event.target).data('style'), $(event.target).data('side'));
	}
});

Template.cardNavigationEnabled.helpers({
	getCardTypeSides: function () {
		return CardNavigation.indexNavigation(CardType.getCardTypeCubeSides(Session.get('cardType')));
	}
});

Template.cardNavigationEnabled.onRendered(function () {
	CardNavigation.selectButton();
	CardVisuals.setSidebarPosition();
});

/*
 * ############################################################################
 * cardNavigationEnabledAnswer
 * ############################################################################
 */

Template.cardNavigationEnabledAnswer.events({
	'click .switchCardSide': function (event) {
		CardNavigation.switchCardSide($(event.target).data('content-id'), ($(event.target).data('navigation-id') + 1), $(event.target).data('style'), $(event.target).data('side'));
	}
});

Template.cardNavigationEnabledAnswer.helpers({
	getCardTypeSides: function () {
		return CardNavigation.indexNavigation(CardType.getCardTypeCubeSides(Session.get('cardType')));
	}
});

Template.cardNavigationEnabledAnswer.onRendered(function () {
	if (Session.get('swapAnswerQuestion') && CardType.isCardTypesWithSwapAnswerQuestionButton(Session.get('cardType'))) {
		CardNavigation.selectButton();
	} else {
		CardNavigation.selectButton(Session.get('answerFocus'));
	}
});

/*
 * ############################################################################
 * cardNavigationEnabledQuestion
 * ############################################################################
 */

Template.cardNavigationEnabledQuestion.events({
	'click .switchCardSide': function (event) {
		CardNavigation.switchCardSide($(event.target).data('content-id'), ($(event.target).data('navigation-id') + 1), $(event.target).data('style'), $(event.target).data('side'));
	}
});

Template.cardNavigationEnabledQuestion.helpers({
	getCardTypeSides: function () {
		if (Session.get('swapAnswerQuestion') && CardType.isCardTypesWithSwapAnswerQuestionButton(Session.get('cardType'))) {
			return CardNavigation.filterNavigation(CardType.getCardTypeCubeSides(Session.get('cardType')), true);
		} else {
			return CardNavigation.filterNavigation(CardType.getCardTypeCubeSides(Session.get('cardType')));
		}
	}
});

Template.cardNavigationEnabledQuestion.onRendered(function () {
	CardNavigation.selectButton();
});

/*
 * ############################################################################
 * cardNavigationItem
 * ############################################################################
 */

Template.cardNavigationItem.helpers({
	getTitle: function () {
		if (CardType.gotCardsetTitleNavigation(Session.get('cardType'))) {
			return Session.get('activeCardsetName');
		} else {
			return TAPi18n.__('card.cardType' + Session.get('cardType') + '.content' + this.contentId);
		}
	},
	getTabIndex: function (index) {
		return CardNavigation.getTabIndex(++index);
	},
	isFirstButton: function (index) {
		return index === 0;
	}
});


/*
 * ############################################################################
 * cardArrowNavigation
 * ############################################################################
 */
Template.cardArrowNavigation.helpers({
	isCardsetOrPresentation: function () {
		return Route.isCardset() || Route.isPresentationOrDemo() || Route.isMakingOf();
	},
	cardCountOne: function () {
		var cardset = Session.get('activeCardset');
		var count = Cards.find({
			cardset_id: cardset._id
		}).count();
		return count === 1;
	},
	isNavigationVisible: function () {
		return CardNavigation.isVisible();
	}
});

Template.cardArrowNavigation.events({
	"click #leftCarouselControl, click #rightCarouselControl": function () {
		CardVisuals.toggleZoomContainer(true);
		CardVisuals.toggleAspectRatioContainer(true);
		CardNavigation.switchCard();
	}
});

/*
 * ############################################################################
 * cardNavigationDisabled
 * ############################################################################
 */

Template.cardNavigationDisabled.onCreated(function () {
	CardNavigation.checkIfReset();
});

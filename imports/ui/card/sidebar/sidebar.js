//------------------------ IMPORTS

import {Template} from "meteor/templating";
import {Route} from "../../../api/route";
import {CardNavigation} from "../../../api/cardNavigation";
import {CardVisuals} from "../../../api/cardVisuals";
import "./sidebar.html";
import "./item/arsnovaClick.js";
import "./item/arsnovaApp.js";
import "./item/cardList.js";
import "./item/backToCardset.js";
import "./item/dictionary.js";
import ".//item/endPresentation.js";
import "./item/toggleFullscreen.js";
import "./item/hideSidebar.js";
import "./item/zoomText.js";
import "./item/leftRightNavigation.js";
import "./item/copy.js";
import "./item/delete.js";
import "./item/edit.js";
import "./item/pomodoroButton.js";
import "./item/help.js";
import "./item/swapQuestionAnswer.js";
import "./item/presentation.js";



/*
 * ############################################################################
 * flashcardSidebar
 * ############################################################################
 */

Template.flashcardSidebar.helpers({
	isCardset: function () {
		return Route.isCardset();
	},
	isPresentation: function () {
		return Route.isPresentation();
	},
	isMakingOf: function () {
		return Route.isMakingOf();
	},
	isDemo: function () {
		return Route.isDemo();
	},
	isEditMode: function () {
		return Route.isEditMode();
	},
	isBox: function () {
		return Route.isBox();
	},
	isMemo: function () {
		return Route.isMemo();
	},
	isFixedSidebar: function () {
		return CardVisuals.isFixedSidebar();
	}
});

/*
 * ############################################################################
 * flashcardSidebarDefaultLeft
 * ############################################################################
 */

Template.flashcardSidebarDefaultLeft.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});


/*
 * ############################################################################
 * flashcardSidebarDefaultRight
 * ############################################################################
 */

Template.flashcardSidebarDefaultRight.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});

/*
 * ############################################################################
 * flashcardSidebarPresentationLeft
 * ############################################################################
 */

Template.flashcardSidebarPresentationLeft.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});

/*
 * ############################################################################
 * flashcardSidebarPresentationRight
 * ############################################################################
 */

Template.flashcardSidebarPresentationRight.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});

/*
 * ############################################################################
 * flashcardSidebarDemoLeft
 * ############################################################################
 */

Template.flashcardSidebarDemoLeft.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});

/*
 * ############################################################################
 * flashcardSidebarDemoRight
 * ############################################################################
 */

Template.flashcardSidebarDemoRight.helpers({
	isMobileView: function () {
		return CardNavigation.isMobileView();
	}
});

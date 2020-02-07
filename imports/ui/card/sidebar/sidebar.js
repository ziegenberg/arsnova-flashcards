//------------------------ IMPORTS

import {Template} from "meteor/templating";
import {CardVisuals} from "../../../utils/cardVisuals";
import "./sidebar.html";
import "./item/aspectRatio.js";
import "./item/arsnovaClick.js";
import "./item/arsnovaLite.js";
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
import "./item/toggle3D.js";
import {Route} from "../../../utils/route";
import {Bonus} from "../../../utils/bonus";
import {NavigatorCheck} from "../../../utils/navigatorCheck";

/*
 * ############################################################################
 * flashcardSidebarLeft
 * ############################################################################
 */

Template.flashcardSidebarLeft.onRendered(function () {
	CardVisuals.setSidebarPosition();
});

Template.flashcardSidebarLeft.helpers({
	gotElements: function () {
		if (Route.isBox() && NavigatorCheck.isSmartphone()) {
			return !Bonus.isInBonus(Router.current().params._id);
		} else {
			return !Route.isTranscript();
		}
	}
});

/*
 * ############################################################################
 * flashcardSidebarRight
 * ############################################################################
 */


Template.flashcardSidebarRight.onRendered(function () {
	CardVisuals.setSidebarPosition();
});

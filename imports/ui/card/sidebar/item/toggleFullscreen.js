import {Session} from "meteor/session";
import "./toggleFullscreen.html";
import {CardVisuals} from "../../../../utils/cardVisuals";
import {PomodoroTimer} from "../../../../utils/pomodoroTimer";
import {Route} from "../../../../utils/route";
import {Template} from "meteor/templating";
import {Dictionary} from "../../../../utils/dictionary";
import {FirstTimeVisit} from "../../../../utils/firstTimeVisit";
import {AspectRatio} from "../../../../utils/aspectRatio";

/*
 * ############################################################################
 * cardSidebarItemToggleFullscreen
 * ############################################################################
 */

Template.cardSidebarItemToggleFullscreen.onRendered(function () {
	if (Route.isDemo() && Session.get('demoFullscreen')) {
		PomodoroTimer.start();
		Session.set('demoFullscreen', false);
	}
});

Template.cardSidebarItemToggleFullscreen.events({
	"click .toggleFullscreen": function () {
		if (Route.isDemo()) {
			Session.set('aspectRatioMode', AspectRatio.getDefault());
		}
		if (Session.get("workloadFullscreenMode")) {
			Session.set("workloadFullscreenMode", false);
		}
		CardVisuals.toggleFullscreen();
		if (Route.isEditMode()) {
			Dictionary.setMode(0);
		}
		if (Route.isDemo() && CardVisuals.isFullscreen()) {
			PomodoroTimer.start();
		} else {
			if (Route.isFirstTimeVisit() && FirstTimeVisit.redirectToHomeAfterFullscreenExit()) {
				Route.setFirstTimeVisit();
				Router.go('home');
			}
		}
		setTimeout(function () {
			CardVisuals.resizeFlashcard();
		}, 250);
	}
});

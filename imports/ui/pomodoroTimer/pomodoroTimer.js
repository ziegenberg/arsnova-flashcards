//------------------------ IMPORTS
import "./pomodoroTimer.html";
import {Template} from "meteor/templating";
import {PomodoroTimer} from "../../api/pomodoroTimer";
import {Bonus} from "../../api/bonus";
import {Route} from "../../api/route";
import {CardVisuals} from "../../api/cardVisuals";
import {Session} from "meteor/session";
import {ServerStyle} from "../../api/styles";

/*
 * ############################################################################
 * pomodoroTimer
 * ############################################################################
 */

Template.pomodoroTimer.onCreated(function () {
	/*This initializes the tooltip over "pomodoro" in the startup modal.*/
	$('[data-toggle="tooltip"]').tooltip();
	PomodoroTimer.startInterval();
});

Template.pomodoroTimer.onRendered(function () {
	if (Route.isPresentation() || Route.isBox() || Route.isMemo() || Route.isDemo()) {
		CardVisuals.resizeFlashcard();
	}
	$('.pomodoroTimer').unbind().on('click', function () {
		PomodoroTimer.clickClock();
	});
	CardVisuals.setPomodoroTimerSize();
	PomodoroTimer.updateArcs();
});

Template.pomodoroTimer.onDestroyed(function () {
	PomodoroTimer.clearInterval();
});

Template.pomodoroTimer.helpers({
	getHourRotation: function () {
		return 'rotate(' + PomodoroTimer.getHourRotation() + ' 50 50)';
	},
	getMinuteRotation: function () {
		return 'rotate(' + PomodoroTimer.getMinuteRotation() + ' 50 50)';
	}
});

/*
 * ############################################################################
 * pomodoroTimerModal
 * ############################################################################
 */

Template.pomodoroTimerModal.onCreated(function () {
	PomodoroTimer.initializeVariables();
});

Template.pomodoroTimerModal.onRendered(function () {
	$('#pomodoroTimerModal').on('show.bs.modal', function () {
		PomodoroTimer.initializeVariables();
		PomodoroTimer.initializeModalContent();
		if (Route.requiresUserInputForFullscreen() && !CardVisuals.isFullscreen()) {
			CardVisuals.toggleFullscreen();
		}
	});
	$('#pomodoroTimerModal').on('shown.bs.modal', function () {
		CardVisuals.setSidebarPosition();
	});
	if (Route.requiresUserInputForFullscreen()) {
		if (Bonus.isInBonus(Router.current().params._id)) {
			PomodoroTimer.start();
		} else {
			if (ServerStyle.gotCardFeature("pomodoro.forceModal")) {
				$('#pomodoroTimerModal').modal('show');
			} else {
				if (!PomodoroTimer.isPomodoroRunning()) {
					if (Route.isDefaultPresentation() || Route.isPresentationList()) {
						PomodoroTimer.initializeVariables();
						PomodoroTimer.initializeModalContent();
						PomodoroTimer.start();
					} else {
						$('#pomodoroTimerModal').modal('show');
					}
				}
			}
		}
	} else if (ServerStyle.gotCardFeature("pomodoro.forceModal")) {
		$('#pomodoroTimerModal').modal('show');
	}
});

Template.pomodoroTimerModal.events({
	'click #settingsBtn': function () {
		PomodoroTimer.updateSettingsBtn();
	},
	'click #startPom': function () {
		if (Route.requiresUserInputForFullscreen) {
			CardVisuals.toggleFullscreen();
		}
		PomodoroTimer.start();
	},
	'click .closePomodoro': function () {
		if (Route.requiresUserInputForFullscreen && !Route.isHome()) {
			CardVisuals.toggleFullscreen();
		}
		PomodoroTimer.setPresentationPomodoro(true);
	},
	'click #cancelPomodoroBtn': function () {
		if (Route.requiresUserInputForFullscreen) {
			CardVisuals.toggleFullscreen();
		}
		$('#pomodoroTimerModal').modal('hide');
		Session.set('presentationPomodoroActive', false);
	}
});

/*
 * ############################################################################
 * pomodoroTimerModalContent
 * ############################################################################
 */

Template.pomodoroTimerModalContent.events({
	'input #pomNumSlider': function () {
		PomodoroTimer.updatePomNumSlider();
	},
	'input #workSlider': function () {
		PomodoroTimer.updateWorkSlider();
	},
	'input #breakSlider': function () {
		PomodoroTimer.updateBreakSlider();
	},
	'change #sound1': function () {
		PomodoroTimer.clockHandler(0);
	},
	'change #sound2': function () {
		PomodoroTimer.clockHandler(1);
	},
	'change #sound3': function () {
		PomodoroTimer.clockHandler(2);
	}
});

import {Session} from "meteor/session";
import {BonusForm} from "../../api/bonusForm";
import "./bonusForm.html";
import {Meteor} from "meteor/meteor";
import {PomodoroTimer} from "../../api/pomodoroTimer";
import {LeitnerProgress} from "../../api/leitnerProgress";

/*
* ############################################################################
* bonusForm
* ############################################################################
*/

Template.bonusForm.onRendered(function () {
	BonusForm.cleanModal();
	$('#bonusFormModal').on('show.bs.modal', function () {
		BonusForm.cleanModal();
		PomodoroTimer.initializeVariables();
		PomodoroTimer.initializeModalContent();
	});
	$('#bonusFormModal').on('hidden.bs.modal', function () {
		BonusForm.cleanModal();
		PomodoroTimer.initializeVariables();
		PomodoroTimer.initializeModalContent();
	});
});

Template.bonusForm.helpers({
	isNewBonus: function () {
		return Session.get('isNewBonus');
	}
});

Template.bonusForm.events({
	"click #startBonus": function () {
		if (Session.get('isNewBonus')) {
			BonusForm.startBonus();
		} else {
			BonusForm.updateBonus();
		}
		$('#bonusFormModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	},
	"click #resetBonus": function () {
		BonusForm.cleanModal();
		PomodoroTimer.initializeVariables();
		PomodoroTimer.initializeModalContent();
	}
});

/*
* ############################################################################
* bonusFormMaxWorkload
* ############################################################################
*/

Template.bonusFormMaxWorkload.events({
	"change input": function () {
		BonusForm.adjustMaxWorkload();
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});

/*
* ############################################################################
* bonusFormDaysBeforeReset
* ############################################################################
*/

Template.bonusFormDaysBeforeReset.events({
	"input #daysBeforeReset": function () {
		BonusForm.adjustDaysBeforeReset();
	}
});

/*
* ############################################################################
* bonusFormStartDate
* ############################################################################
*/

Template.bonusFormStartDate.events({
	"input #dateBonusStart": function () {
		BonusForm.adjustRegistrationPeriod();
	}
});

/*
* ############################################################################
* bonusFormEndDate
* ############################################################################
*/

Template.bonusFormEndDate.events({
	"input #dateBonusEnd": function () {
		BonusForm.adjustRegistrationPeriod();
	}
});

/*
* ############################################################################
* bonusFormMaxPoints
* ############################################################################
*/

Template.bonusFormMaxPoints.events({
	"input #maxBonusPoints": function () {
		BonusForm.adjustMaxBonusPoints();
	}
});

/*
* ############################################################################
* bonusFormIntervals
* ############################################################################
*/

Template.bonusFormIntervals.events({
	"input #bonusFormInterval1, input #bonusFormInterval2, input #bonusFormInterval3, input #bonusFormInterval4, input #bonusFormInterval5": function () {
		BonusForm.adjustInterval();
	},
	"change input": function () {
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});

/*
* ############################################################################
* joinBonusForm
* ############################################################################
*/

Template.joinBonusForm.events({
	"click #joinBonusConfirm": function () {
		Meteor.call("joinBonus", Session.get('activeCardset')._id);
		$('#joinBonusModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	}
});

/*
* ############################################################################
* leaveBonusForm
* ############################################################################
*/

Template.leaveBonusForm.events({
	"click #leaveBonusConfirm": function () {
		Meteor.call("leaveBonus", Session.get('activeCardset')._id);
		$('#leaveBonusModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	}
});

/*
 * ############################################################################
 * profileIncompleteModal
 * ############################################################################
 */

Template.profileIncompleteModal.events({
	'click #completeProfileGoToProfile': function () {
		$('#profileIncompleteModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
		Router.go('profileSettings', {
			_id: Meteor.userId()
		});
	},
	'click #completeProfileCancel': function () {
		$('#profileIncompleteModal').modal('hide');
		$('body').removeClass('modal-open');
		$('.modal-backdrop').remove();
	}
});

/*
 * ############################################################################
 * bonusFormSimulatorCalculate
 * ############################################################################
 */

Template.bonusFormSimulatorCalculate.events({
	'click .calculateWorkload': function () {
		BonusForm.adjustErrorCount();
		BonusForm.calculateWorkload(BonusForm.getMaxWorkload());
		LeitnerProgress.updateGraph();
	}
});


/*
 * ############################################################################
 * bonusFormSimulatorErrorRate
 * ############################################################################
 */


Template.bonusFormSimulatorErrorRate.helpers({
	getCardCount: function () {
		return BonusForm.getCardCount();
	}
});

Template.bonusFormSimulatorErrorRate.events({
	'change input': function () {
		BonusForm.adjustErrorCount();
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	},
	'click #resetErrorRate': function () {
		BonusForm.resetErrorCount();
	}
});

/*
 * ############################################################################
 * bonusFormSimulatorSnapshots
 * ############################################################################
 */

Session.setDefault('activeSimulatorSnapshotDate', 0);

Template.bonusFormSimulatorSnapshots.helpers({
	getSnapshots: function () {
		return BonusForm.getSnapshotDates();
	},
	isActive: function (index) {
		if (Session.get('activeSimulatorSnapshotDate') === index) {
			return true;
		}
	}
});

Template.bonusFormSimulatorSnapshots.events({
	'click .snapshot-date': function (event) {
		Session.set('activeSimulatorSnapshotDate', $(event.target).data('id'));
		BonusForm.initializeSimulatorData();
		LeitnerProgress.updateGraph();
	}
});

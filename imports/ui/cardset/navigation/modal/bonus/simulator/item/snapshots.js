import "./snapshots.html";
import {Session} from "meteor/session";
import {BonusForm} from "../../../../../../../utils/bonusForm";
import {LeitnerProgress} from "../../../../../../../utils/leitnerProgress";

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

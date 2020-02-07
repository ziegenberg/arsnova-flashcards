import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {MainNavigation} from "../../../../../utils/mainNavigation.js";
import "./statistics.html";

/*
 * ############################################################################
 * mainNavigationFooterItemStatistics
 * ############################################################################
 */

Template.mainNavigationFooterItemStatistics.helpers({
	serverStatisticsModalActive: function () {
		return Session.get('serverStatisticsModalActive');
	}
});

Template.mainNavigationFooterItemStatistics.events({
	"click .showStatistics": function () {
		$('#impressumStatisticsModal').modal('show');
		MainNavigation.closeCollapse();
	}
});

/*
 * ############################################################################
 * mainNavigationFooterItemStatisticsMobile
 * ############################################################################
 */

Template.mainNavigationFooterItemStatisticsMobile.helpers({
	serverStatisticsModalActive: function () {
		return Session.get('serverStatisticsModalActive');
	}
});

Template.mainNavigationFooterItemStatisticsMobile.events({
	"click .showStatistics": function () {
		$('#impressumStatisticsModal').modal('show');
		MainNavigation.closeCollapse();
	}
});

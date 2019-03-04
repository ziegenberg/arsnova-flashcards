import {Template} from "meteor/templating";
import {Route} from "../../../../api/route";
import {Session} from "meteor/session";
import {AspectRatio} from "../../../../api/aspectRatio";
import "./demo.html";

/*
 * ############################################################################
 * demo
 * ############################################################################
 */

Template.demo.onCreated(function () {
	Session.set('aspectRatioMode', AspectRatio.getDefault());
});

Template.demo.helpers({
	isFirstTimeVisit: function () {
		return Route.isFirstTimeVisit();
	}
});

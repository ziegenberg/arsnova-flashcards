//------------------------ IMPORTS
import {Session} from "meteor/session";
import {Template} from "meteor/templating";
import "../../navigation/modal/import.js";
import "./import.html";

/*
 * ############################################################################
 * cardsetNavigationImport
 * ############################################################################
 */

Template.cardsetNavigationImport.events({
	'click #importCardsBtn': function () {
		Session.set('importType', 1);
	}
});

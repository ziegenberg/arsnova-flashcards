import {Route} from "../../../../../utils/route";
import "./backToHome.html";

/*
 * ############################################################################
 * mainNavigationFooterItemBackToHome
 * ############################################################################
 */

Template.mainNavigationFooterItemBackToHome.events({
	'click #backToStartButton': function (event) {
		event.preventDefault();
		Route.setFirstTimeVisit();
		Router.go('home');
	}
});

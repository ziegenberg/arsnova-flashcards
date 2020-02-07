import "./item/cardsets.js";
import "./item/repetitorien.js";
import "./public.html";
import {Template} from "meteor/templating";
import {ServerStyle} from "../../../../../../utils/serverStyle";


/*
* ############################################################################
* mainNavigationTopItemPublic
* ############################################################################
*/

Template.mainNavigationTopItemPublic.helpers({
	gotBothNavigationElements: function () {
		return ServerStyle.gotNavigationFeature("public.cardset.enabled") && ServerStyle.gotNavigationFeature("public.repetitorium.enabled");
	}
});

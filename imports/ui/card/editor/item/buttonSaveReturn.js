import {CardEditor} from "../../../../utils/cardEditor.js";
import "./buttonSaveReturn.html";

/*
 * ############################################################################
 * cardEditorItemButtonSaveReturn
 * ############################################################################
 */

Template.cardEditorItemButtonSaveReturn.events({
	"click #cardSaveReturn": function () {
		CardEditor.saveCard(Router.current().params.card_id, 1);
	}
});

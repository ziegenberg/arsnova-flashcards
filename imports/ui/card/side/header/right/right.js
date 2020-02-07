import "./right.html";
import {MarkdeepEditor} from "../../../../../utils/markdeepEditor";

/*
 * ############################################################################
 * flashcardHeaderEditorRight
 * ############################################################################
 */

Template.flashcardHeaderEditorRight.helpers({
	isMobilePreview: function () {
		return MarkdeepEditor.getMobilePreview();
	}
});

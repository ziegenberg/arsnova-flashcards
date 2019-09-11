import {Template} from "meteor/templating";
import {CardType} from "../../../api/cardTypes";
import {Cardsets} from "../../../api/cardsets";
import "./item/deleteAllCards.js";
import "./item/editCardset.js";
import "./item/editLicense.js";
import "./item/editRepetitorium.js";
import "./item/export.js";
import "./item/import.js";
import "./item/newCard.js";
import "./item/publishCardset.js";
import "./item/transcripts.js";
import "./item/bonus/manage.js";
import "./item/bonus/stats.js";
import "./item/bonus/start.js";
import "./item/bonus/stop.js";
import "./sidebar.html";

/*
 * ############################################################################
 * cardsetSidebar
 * ############################################################################
 */

Template.cardsetSidebar.helpers({
	enableIfPublished: function () {
		return this.kind !== 'personal';
	},
	gotLearningModes: function () {
		if (this.shuffled) {
			for (let i = 0; i < this.cardGroups.length; i++) {
				if (CardType.gotLearningModes(Cardsets.findOne(this.cardGroups[i]).cardType)) {
					return true;
				}
			}
		} else {
			return CardType.gotLearningModes(this.cardType);
		}
	}
});

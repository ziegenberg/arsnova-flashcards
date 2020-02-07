import {Template} from "meteor/templating";
import {Session} from "meteor/session";
import {CardType} from "../../../utils/cardTypes";
import {ServerStyle} from "../../../utils/serverStyle";
import "./create.html";

Template.useCasesItemCreateDropdown.helpers({
	getTranscriptLongName: function () {
		return CardType.getCardTypeLongName(2);
	}
});

Template.useCasesItemCreateDropdown.events({
	'click .cardType': function (evt) {
		evt.preventDefault();
		let cardType = $(evt.currentTarget).attr("data");
		$('.setCardTypeUseCase').html($(evt.currentTarget).text());
		$('.setCardTypeUseCase').val(cardType);
		if (Number(cardType) === 2 && ServerStyle.gotTranscriptsEnabled()) {
			$('#useCasesModal').modal('hide');
			Router.go('newTranscript');
		} else {
			Session.set('useCaseSelectedCardType', Number(cardType));
			if (Number(cardType) > -1) {
				Session.set('useCaseType', 1);
				Session.set('isNewCardset', true);
				$('#useCasesModal').modal('hide');
			}
		}
	}
});

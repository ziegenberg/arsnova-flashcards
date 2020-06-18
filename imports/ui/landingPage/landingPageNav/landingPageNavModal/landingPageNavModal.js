import './landingPageNavModal.html';
import {toggleClass, animateScroll} from "../landingPageNav";

function hideModal() {
	let modal = document.getElementById("NavPopupModal");
	modal.style.display = "none";
}

function scrollTo(event, id) {
	event.preventDefault();
	toggleClass(false);
	hideModal();
	animateScroll(id);
	toggleClass(true);
}

Template.landingPageNavModal.events({
	"click .close": function () {
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
	},
	"click #scrollImpressum": function (event) {
		scrollTo(event, "#landing-page-footer");
	},
	"click #scrollQuestions": function (event) {
		scrollTo(event, "#landing-page-questions");
	},
	"click #scrollFeatures": function (event) {
		scrollTo(event, "#landing-page-feature");
	},
	"click #scrollIntegrations": function (event) {
		scrollTo(event, "#landing-page-integrates");
	},
	"click #scrollIntro": function (event) {
		event.preventDefault();
		toggleClass(false);
		hideModal();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		toggleClass(true);
	},
	"click": function (event) {
		let modal = document.getElementById("NavPopupModal");
		if (event.target === modal) {
			modal.style.display = "none";
		}
	}
});

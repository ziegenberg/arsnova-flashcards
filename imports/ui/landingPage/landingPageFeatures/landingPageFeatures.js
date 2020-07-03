import './landingPageFeatures.html';
import './landingPageFeatureModal/landingPageFeatureModal.js';
import './landingPageFeaturesCards/bonus/landingPageFeatureCardsBonus.js';
import './landingPageFeaturesCards/cards/landingPageFeatureCardsCards.js';
import './landingPageFeaturesCards/download/landingPageFeatureCardsDownload.js';
import './landingPageFeaturesCards/pomodor/landingPageFeatureCardsPomodoro.js';

function turnOffCards() {
	$('#featureCardsBonus').css("display", "none");
	$('#featureCardsPomodoro').css("display", "none");
	$('#featureCardsCards').css("display", "none");
	$('#featureCardsDownloads').css("display", "none");
}

Template.landingPageFeatures.events({
	"click .landing-page-feature-bonus": function () {
		turnOffCards();
		$('#featurePopupModal').css("display", "block");
		$('#featureCardsBonus').css("display", "block");
		$('.landing-page-feature-card p').css("display", "block");
	},
	"click .landing-page-feature-pomodoro": function () {
		turnOffCards();
		$('#featurePopupModal').css("display", "block");
		$('#featureCardsPomodoro').css("display", "block");
		$('.landing-page-feature-card p').css("display", "block");
	},
	"click .landing-page-feature-cards": function () {
		turnOffCards();
		$('#featurePopupModal').css("display", "block");
		$('#featureCardsCards').css("display", "block");
		$('.landing-page-feature-card p').css("display", "block");
	},
	"click .landing-page-feature-download": function () {
		turnOffCards();
		$('#featurePopupModal').css("display", "block");
		$('#featureCardsDownloads').css("display", "block");
		$('.landing-page-feature-card p').css("display", "block");
	},
});


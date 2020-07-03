import './landingPageFeatureModal.html';

Template.landingPageFeatureModal.events({
	"click": function () {
		let modal = $('#featurePopupModal');
		modal.css("display", "none");
		$('.landing-page-feature-card p').css("display", "none");
	}
});

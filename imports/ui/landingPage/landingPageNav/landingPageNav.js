import './landingPageNav.html';

Template.landingPageNav.events({
	"click #navbar-icon": function () {
	    let modal = document.getElementById("NavPopupModal");
	    modal.style.display = "block";
	},
	"click #navScrollImpressum": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#landing-page-footer").offset().top
        }, 600);
    },
	"click #navScrollQuestions": function (event) {
	    event.preventDefault();
	    $('html, body').animate({
            scrollTop: $("#landing-page-questions").offset().top
        }, 600);
	},
	"click #navScrollFeatures": function (event) {
	    event.preventDefault();
	    $('html, body').animate({
            scrollTop: $("#landing-page-feature").offset().top
        }, 600);
	},
	"click #navScrollIntegrations": function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("#landing-page-integrates").offset().top
		}, 600);
	},
	"click #navScrollIntro": function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $("#landing-page-intro").offset().top
		}, 600);
	}
});

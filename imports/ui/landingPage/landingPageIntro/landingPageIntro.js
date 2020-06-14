import './landingPageIntro.html';

Template.landingPageIntro.events({
    "click .close": function () {
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
    },
    "click #scrollImpressum": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#landing-page-footer").offset().top
		}, 600);
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
    },
    "click #scrollQuestions": function (event) {
        event.preventDefault();
        $('html, body').animate({
			scrollTop: $("#landing-page-questions").offset().top
		}, 600);
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
        },
    "click #scrollFeatures": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#landing-page-feature").offset().top + 51
		}, 600);
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
        },
    "click #scrollIntegrations": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("#landing-page-integrates").offset().top
		}, 600);
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
        },
    "click #scrollIntro": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 600);
        let modal = document.getElementById("NavPopupModal");
        modal.style.display = "none";
    },
    "click": function (event) {
        let modal = document.getElementById("NavPopupModal");
        if (event.target === modal) {
        	modal.style.display = "none";
        }
    }
});

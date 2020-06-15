import './landingPageNav.html';

Template.landingPageNav.events({
	"click #navbar-icon": function () {
	    let modal = document.getElementById("NavPopupModal");
	    modal.style.display = "block";
	},
	"click #navScrollImpressum": function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: -51 + $("#landing-page-footer").offset().top
        }, 600);
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
    },
	"click #navScrollQuestions": function (event) {
	    event.preventDefault();
	    $('html, body').animate({
            scrollTop: -51 +$("#landing-page-questions").offset().top
        }, 600);
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
	},
	"click #navScrollFeatures": function (event) {
	    event.preventDefault();
	    $('html, body').animate({
            scrollTop: -51 + $("#landing-page-feature").offset().top
        }, 600);
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
	},
	"click #navScrollIntegrations": function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: -51 + $("#landing-page-integrates").offset().top
		}, 600);
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
	},
	"click #navScrollIntro": function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 600);
		let modal = document.getElementById("NavPopupModal");
		modal.style.display = "none";
	}
});

Template.landingPageNav.helpers({
	maxScreenWidth: function () {
		return window.innerWidth;
	}
});
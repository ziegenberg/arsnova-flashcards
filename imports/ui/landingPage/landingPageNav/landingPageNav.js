import './landingPageNav.html';

export let animationTime = 600; //scroll animation time

export function toggleClass(withTimeout) {
	let containers = document.getElementsByClassName("template-containers");
	if (withTimeout) {
		setTimeout(function () {
			toggleClass();
		},animationTime+10);	//gives animation time before classes are added back
	} else {
		for (let i = 0; i < containers.length; i++) {
			containers[i].classList.toggle("landing-page-scroll-snap");
		}
	}
}

export function animateScroll(id){
	$('html, body').animate({
		scrollTop: $(id).offset().top - 51
	}, animationTime);
}

function scrollTo(event, id) {
	event.preventDefault();
	toggleClass(false);
	animateScroll(id);
	toggleClass(true);
}

Template.landingPageNav.events({
	"click #navbar-icon": function () {
	    let modal = document.getElementById("NavPopupModal");
	    modal.style.display = "block";
	},
	"click #navScrollImpressum": function (event) {
		scrollTo(event, "#landing-page-footer");
    },
	"click #navScrollQuestions": function (event) {
	    scrollTo(event, "#landing-page-questions");
	},
	"click #navScrollFeatures": function (event) {
	    scrollTo(event, "#landing-page-feature");
	},
	"click #navScrollIntegrations": function (event) {
		scrollTo(event, "#landing-page-integrates");
	},
	"click #navScrollIntro": function (event) {
		event.preventDefault();
		toggleClass(false);
		$('html, body').animate({
			scrollTop: 0
		}, animationTime);
		toggleClass(true);
	}
});

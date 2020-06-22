import "./landingPageQuestions.html";
import {toggleClass, animationTime} from "../landingPageNav/landingPageNav";

Template.landingPageQuestions.events({
	"click .landing-page-questions-backToTop i": function (event) {
		event.preventDefault();
		toggleClass(false);
		$('html, body').animate({
			scrollTop: 0
		}, animationTime);
		toggleClass(true);
	}
});
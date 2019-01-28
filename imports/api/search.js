import {Meteor} from "meteor/meteor";
import {NavigatorCheck} from "./navigatorCheck";

export let CardVisuals = class CardVisuals {

	static adjustSearchResultWindowSize () {
		if (Meteor.userId()) {
			let destination = $('.input-search:visible');
			let target = $('#searchResults');
			if (destination.length && target.length) {
				let offsetTop = (destination.offset().top + destination.height());
				let leftOffset;
				if (NavigatorCheck.isSmartphone()) {
					leftOffset = 0;
					target.css('width', $(window).width());
				} else {
					if (NavigatorCheck.isIOS()) {
						target.css('width', $(window).width() - (2 * destination.offset().left));
					}
					leftOffset = destination.offset().left;
				}
				target.css('max-height', ($(window).height() - offsetTop));
				target.css('left', leftOffset);
				target.css('top', offsetTop);
			}
		}
	}
};

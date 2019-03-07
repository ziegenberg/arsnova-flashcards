import {Session} from "meteor/session";
import {Route} from "./route";
import {NavigatorCheck} from "./navigatorCheck";

let keyEventsUnlocked = true;
let firstTimePresentation = 'isFirstTimePresentation';
let firstTimeLeitner = 'isFirstTimeLeitner';
let firstTimeWozniak = 'isFirstTimeWozniak';
let firstTimeDemo = 'isFirstTimeDemo';
let loginTarget;
let topNavigationID = "#navbar-cards-top";
let footerNavigationID = "#navbar-cards-footer";
let topNavigationCollapseID = "#navbar-cards-top-collapse";
let footerNavigationCollapseID = "#navbar-cards-footer-collapse";

export let MainNavigation = class MainNavigation {

	static showHelp () {
		$('#helpModal').modal('show');
	}

	static focusSearchBar () {
		if (NavigatorCheck.isSmartphone()) {
			$('.input-search').focus();
		} else {
			$('#toggle-search-dropdown').click();
		}
	}

	static getFirstTimePresentationString () {
		return firstTimePresentation;
	}

	static getFirstTimeLeitnerString () {
		return firstTimeLeitner;
	}

	static getFirstTimeWozniakString () {
		return firstTimeWozniak;
	}

	static getFirstTimeDemoString () {
		return firstTimeDemo;
	}

	static setLoginTarget (target) {
		loginTarget = target;
	}

	static getLoginTarget () {
		return loginTarget;
	}

	static toggleHelp () {
		if ($('#helpModal').is(':visible')) {
			$('#helpModal').modal('hide');
		} else {
			$('#helpModal').modal('show');
		}
	}

	static enableKeyEvents () {
		keyEventsUnlocked = true;
	}

	static keyEvents (event) {
		if (keyEventsUnlocked) {
			let keyCodes = [112];
			keyEventsUnlocked = false;
			if (keyCodes.indexOf(event.keyCode) > -1) {
				event.preventDefault();
				switch (event.keyCode) {
					case 112:
						if (Session.get('helpFilter') !== undefined || Route.isPresentationOrDemo() || Route.isBox() || Route.isMemo()) {
							this.toggleHelp();
						}
						break;
				}
			}
		}
	}

	static resizeFooterElements (isMobile = false) {
		if (isMobile) {
			$("#navbar-cards-footer #navbar-cards-footer-collapse li:visible").removeAttr("style");
			$("#navbar-cards-footer #navbar-cards-footer-collapse a:visible").removeAttr("style");
		} else {
			let counter = $("#navbar-cards-footer #navbar-cards-footer-collapse ul > li:visible").length;
			let navbarWidth = $("#navbar-cards-footer #navbar-cards-footer-collapse .navbar-nav").width();
			$("#navbar-cards-footer #navbar-cards-footer-collapse li:visible").css('width', Math.floor(navbarWidth / counter));
			$("#navbar-cards-footer #navbar-cards-footer-collapse a:visible").css('width', Math.floor(navbarWidth / counter));
		}
	}

	static clearSearch () {
		$('.input-search').val('');
		Session.set("searchValue", undefined);
		Session.set('searchCategoriesResult', []);
	}
	static closeCollapse () {
		$(topNavigationCollapseID).collapse('hide');
		$(footerNavigationCollapseID).collapse('hide');
	}

	static repositionCollapseElements () {
		if (window.innerWidth < 768) {
			$(footerNavigationID).addClass('navbar-fixed-top');
			$(footerNavigationID).removeClass('navbar-fixed-bottom');
			this.resizeFooterElements(true);
		} else {
			$(footerNavigationID).addClass('navbar-fixed-bottom');
			$(footerNavigationID).removeClass('navbar-fixed-top');
			this.resizeFooterElements(false);
		}
		$(topNavigationCollapseID).css('max-height',$(window).height() - $(topNavigationID).height());
		$(footerNavigationCollapseID).css('max-height',$(window).height() - $(topNavigationID).height());
	}

	static initializeNavigation () {
		this.repositionCollapseElements();
		$(window).resize(function () {
			MainNavigation.repositionCollapseElements();
		});
	}
};

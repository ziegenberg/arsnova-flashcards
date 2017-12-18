import * as global from "./global.js";


module.exports = {
	collapseCardsetInfo: function (click = true) {
		browser.waitForVisible('#collapseCardsetInfoButton', global.threshold);
		if (click) {
			browser.click('#collapseCardsetInfoButton');
		}
	},
	learnMemo: function (click = true) {
		browser.waitForVisible('#learnMemo', global.threshold);
		if (click) {
			browser.click('#learnMemo');
		}
	},
	learnBox: function (click = true) {
		browser.waitForVisible('#learnBox', global.threshold);
		if (click) {
			browser.click('#learnBox');
		}
	},
	leitnerProgress: function (click = true) {
		browser.waitForVisible('#leitnerProgress', global.threshold);
		if (click) {
			browser.click('#leitnerProgress');
		}
	},
	cardList: function (click = true) {
		browser.waitForVisible('#btnToListLayout', global.threshold);
		if (click) {
			browser.click('#btnToListLayout');
		}
	},
	cardDetail: function (click = true) {
		browser.waitForVisible('#btnToCardLayout', global.threshold);
		if (click) {
			browser.click('#btnToCardLayout');
		}
	},
	newCard: function (click = true) {
		browser.waitForExist('#newCardBtn', global.threshold);
		if (click) {
			browser.click('#newCardBtn');
			browser.waitForExist('#cardType0', global.threshold);
			browser.click('#cardType0');
		}
	},
	saveCard: function (click = true) {
		browser.waitForExist('#cardSave', global.threshold);
		if (click) {
			browser.click('#cardSave');
		}
	},
	saveCardReturn: function (click = true) {
		browser.waitForExist('#cardSaveReturn', global.threshold);
		if (click) {
			browser.click('#cardSaveReturn');
		}
	},
	cancelCardEdit: function (click = true) {
		browser.waitForVisible('#cardCancel', global.threshold);
		if (click) {
			browser.click('#cardCancel');
		}
	},
	editCard: function (click = true) {
		browser.waitForVisible('#editCard', global.threshold);
		if (click) {
			let editButton = browser.elements('#editCard').value[0];
			editButton.click();
		}
	},
	deleteCard: function (click = true) {
		browser.waitForVisible('#cardDelete', global.threshold);
		if (click) {
			browser.click('#cardDelete');
		}
	},
	deleteCardConfirm: function (click = true) {
		browser.waitForVisible('#cardDeleteConfirm', global.threshold);
		if (click) {
			browser.click('#cardDeleteConfirm');
		}
	},
	deleteAllCards: function (click = true) {
		browser.waitForVisible('#delete_cards', global.threshold);
		if (click) {
			browser.click('#delete_cards');
		}
	},
	deleteAllCardsConfirm: function (click = true) {
		browser.waitForVisible('#deleteCardsConfirm', global.threshold);
		if (click) {
			browser.click('#deleteCardsConfirm');
		}
	},
	deleteAllCardsCancel: function (click = true) {
		browser.waitForVisible('#deleteCardsCancel', global.threshold);
		if (click) {
			browser.click('#deleteCardsCancel');
		}
	}
};

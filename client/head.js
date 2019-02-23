// STARTUP IMPORTS

import "../imports/startup/client/i18n.js";
import "../imports/startup/client/registerhelper.js";
import "../imports/startup/client/registerServiceWorker";
import "../imports/startup/client/routes.js";
import "../imports/ui/main/main.js";
import {ServerStyle} from "../imports/api/styles.js";

window.addEventListener("load", function () {
	window.cookieconsent.initialise({
		"palette": {
			"popup": {
				"background": "#4A5C66",
				"text": "#ffffff"
			},
			"button": {
				"background": "#FF9F30",
				"text": "#4a5c66"
			}
		},
		"theme": "edgeless",
		"position": "bottom-right",

		"content": {
			"message": "Erspare uns bitte lange Erklärungen, warum »" +
				ServerStyle.getFirstAppTitle() + "🍅" + ServerStyle.getLastAppTitle() +
				"« Cookies verwendet. Unter anderem würde dieser Hinweis bei jedem Besuch erscheinen." +
				" Alle rechtlichen Hinweise findest du unter",
			"dismiss": "Ist klar, ich akzeptiere das.",
			"link": "Datenschutz.",
			"href": "/datenschutz"
		}
	});
});
// USER INTERFACE IMPORTS -------------------------------------------------

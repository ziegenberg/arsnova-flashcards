import './landingPage.html';
import './landingPageNav/landingPageNav.js';
import './landingPageIntro/landingPageIntro.js';
import './landingPageFeatures/landingPageFeatures.js';
import './landingPageIntegrates/landingPageIntegrates.js';
import './landingPageQuestions/landingPageQuestions.js';
import './landingPageFooter/landingPageFooter.js';
import {setLanguage, setTheme} from "../../startup/client/routes";

Template.landingPage.onCreated(function () {
    setLanguage();
    setTheme();
});

let navHeight = "200px";

Template.landingPage.helpers({
    maxUserHeight: function () {
        return window.innerHeight;
    },
    maxUserHeightWithNav: function () {
        return window.innerHeight - navHeight;
    },
    navHeight: function () {
        return navHeight;
    }
});

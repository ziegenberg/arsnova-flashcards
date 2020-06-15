import './landingPage.html';
import './landingPageNav/landingPageNav.js';
import './landingPageNav/landingPageNavModal/landingPageNavModal.js';
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

Template.landingPage.helpers({
    maxUserHeight: function () {
        return window.innerHeight - 51;
    },
});

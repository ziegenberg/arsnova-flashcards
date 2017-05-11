/* exported login */
export function login(username) {
	browser.waitForExist('#TestingBackdoorUsername',15000);
	var SetUsername = function (name) {
		$('#TestingBackdoorUsername').val(name);
	};
	browser.execute(SetUsername, username);
	browser.waitForExist('#BackdoorLogin',15000);
	browser.click('#BackdoorLogin');
}

/* exported logout */
export function logout() {
	browser.waitForExist('#logout', 15000);
	browser.click('#logout');
}

/* exported agreeCookies */
export function agreeCookies() {
	browser.waitForExist('a.cc_btn.cc_btn_accept_all',15000);
	browser.setCookie({name: 'cookieconsent_dismissed', value: 'yes'});
	browser.click('a.cc_btn.cc_btn_accept_all');
}

/* exported firstLogin */
export function firstLogin(username) {
	login(username);
	browser.waitForExist('#accept_checkbox', 15000);
	browser.$('#accept_checkbox').click();
	browser.click('button[id="accept_button"]');
}

/* exported setResolution */
export function setResolution() {
	browser.setViewportSize({
		width: 1920,
		height: 1080
	});
	browser.windowHandleSize();
}

/* exported logoutAdmin */
export function logoutAdmin() {
	browser.waitForExist('#logout_admin', 15000);
	browser.click('#logout_admin');
}

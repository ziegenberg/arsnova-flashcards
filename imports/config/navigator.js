let minimumTabletWidth = 768;
let minimumTabletHeight = 1024;
let maximumTabletWidth = 1024;
let maximumTabletHeight = 1366;
let iOSPlatforms = ['iPhone', 'iPad', 'iPod'];
let macOSPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];

//  Feature List
//0: Minute jump clock
//1: WordCloud - Landing Page
//2: WordCloud - Filter
//3: Demo
//4: 3D-Cube
//5: 3D-Cube: cancel active transitions
let enabledSmartphoneFeatures = [0, 1, 2, 3];
let enabledIOSFeatures = [3];
let enabledMacOSSafariFeatures = [2, 3, 4, 5];

module.exports = {
	minimumTabletWidth,
	minimumTabletHeight,
	maximumTabletWidth,
	maximumTabletHeight,
	iOSPlatforms: iOSPlatforms,
	macOSPlatforms: macOSPlatforms,
	enabledIOSFeatures,
	enabledMacOSSafariFeatures,
	enabledSmartphoneFeatures
};

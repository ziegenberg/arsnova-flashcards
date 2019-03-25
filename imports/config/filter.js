//Filter
let itemStartingValue = 5;
let itemIncrementValue = 20;

//Filter Navigation

//0: Themen-Pool / Pool
//1: Kartei anlegen / My Cardsets
//2: Repetitorien / Repetitorium
//3: Lernpensum / Learning
//4: Alle Karteien / All Cardsets
//5: Kartei mischen / Shuffle
//6: Alle Repetitorien / All repetitorien
//7: Meine Repetitorien / Personal repetitorien
let filtersWithResetButton = [0, 1, 2, 3, 4, 5, 6, 7];
let filtersWithDisplayModeButton = [0, 2, 4, 7];
let filtersWithSortButton = [0, 1, 2, 3, 4, 5, 6, 7];
let filtersWithDefaultSortName = [0, 2, 3, 5];
let filtersWithDefaultSortDateUpdated = [1, 4, 6, 7];
let filtersWithDefaultSortDateCreated = [];
let filtersWithAuthor = [0, 2, 3, 4, 5];
let filtersWithCardType = [0, 1, 3, 4, 5];
let filtersWithDifficulty = [0, 1, 3, 4, 5];
let filtersWithTargetAudience = [];
let filtersWithSemester = [];
let filtersWithCollege = [];
let filtersWithCourse = [];
let filtersWithModule = [];
let filtersWithBonus = [0, 2, 3, 4, 5, 6, 7];
let filtersWithWordcloud = [0, 1, 2, 4, 5, 6, 7];
let filtersWithKind = [0, 1, 2, 3, 4, 5, 6, 7];
let filtersWithPersonalKind = [1, 3, 4, 5, 6, 7];
let filtersWithFreeKind = [0, 1, 2, 3, 4, 5, 6, 7];
let filtersWithEduKind = [0, 1, 2, 3, 4, 5, 6, 7];
let filtersWithProKind = [0, 1, 2, 3, 4, 5, 6, 7];

module.exports = {
	itemStartingValue,
	itemIncrementValue,
	filtersWithResetButton,
	filtersWithDisplayModeButton,
	filtersWithSortButton,
	filtersWithDefaultSortName,
	filtersWithDefaultSortDateUpdated,
	filtersWithDefaultSortDateCreated,
	filtersWithAuthor,
	filtersWithCardType,
	filtersWithDifficulty,
	filtersWithTargetAudience,
	filtersWithSemester,
	filtersWithCollege,
	filtersWithCourse,
	filtersWithModule,
	filtersWithBonus,
	filtersWithWordcloud,
	filtersWithKind,
	filtersWithPersonalKind,
	filtersWithFreeKind,
	filtersWithEduKind,
	filtersWithProKind
};

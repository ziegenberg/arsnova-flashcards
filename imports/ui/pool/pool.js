//------------------------ IMPORTS

import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Session} from 'meteor/session';

import { Cardsets } from '../../api/cardsets.js';
import { Categories } from '../../api/categories.js';
import { Ratings } from '../../api/ratings.js';

import './pool.html';


Meteor.subscribe("categories");
Meteor.subscribe("cardsets");

Session.setDefault('poolSortTopic', {name: -1});
Session.setDefault('poolFilterAutor', {lastName: -1});
Session.setDefault('poolFilterModule', {moduleShort: -1});;
Session.setDefault('poolFilterCourse', {academicCourse: -1});
Session.setDefault('poolFilterDepartment', {department: -1});
Session.setDefault('poolFilterStudyType', {studyType: -1});
Session.setDefault('poolFilter', ["free", "edu", "pro"]);

/**
 * ############################################################################
 * category
 * ############################################################################
 */

Template.category.helpers({
    getDecks: function() {
        var id = parseInt(this._id);
        return Cardsets.find({
            visible: true,
            kind: {$in: Session.get('poolFilter')}
        }, {
            sort: Session.get('poolSortTopic', 'poolSortAutor')
        });
    },
    getModules: function() {
        var Array = Cardsets.find( {visible: true} ).fetch();
        var distinctArray = _.uniq(Array, false, function(d) {return d.moduleLong});
        return disctinctValues = _.pluck(distinctArray, 'moduleLong');
    },
    getCourse: function() {
        var Array = Cardsets.find( {visible: true} ).fetch();
        var distinctArray = _.uniq(Array, false, function(d) {return d.academicCourse});
        return disctinctValues = _.pluck(distinctArray, 'academicCourse');
    },
    getDepartments: function() {
        var Array = Cardsets.find( {visible: true} ).fetch();
        var distinctArray = _.uniq(Array, false, function(d) {return d.department});
        return disctinctValues = _.pluck(distinctArray, 'department');
    },
    getTypes: function() {
        var Array = Cardsets.find( {visible: true} ).fetch();
        var distinctArray = _.uniq(Array, false, function(d) {return d.studyType});
        return disctinctValues = _.pluck(distinctArray, 'studyType');
    },
    getAverage: function() {
        var ratings = Ratings.find({
            cardset_id: this._id
        });
        var count = ratings.count();
        if (count !== 0) {
            var amount = 0;
            ratings.forEach(function(rate) {
                amount = amount + rate.rating;
            });
            var result = (amount / count).toFixed(2);
            return result;
        } else {
            return 0;
        }
    },
    getSortUserIcon: function(val) {
        var sort = Session.get('poolSort');
        if (sort.username === 1) {
            return '<i class="fa fa-sort-asc"></i>';
        } else if (sort.username === -1){
            return '<i class="fa fa-sort-desc"></i>';
        }
    },
    getSortNameIcon: function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            return '<i class="fa fa-sort-asc"></i>';
        } else if (sort.name === -1){
            return '<i class="fa fa-sort-desc"></i>';
        }
    },
    getSortRelevanceIcon: function() {
        var sort = Session.get('poolSort');
        if (sort.relevance === 1) {
            return '<i class="fa fa-sort-asc"></i>';
        } else if (sort.relevance === -1){
            return '<i class="fa fa-sort-desc"></i>';
        }
    },
    getKind: function() {
        switch (this.kind) {
            case "free":
                return '<span class="label label-default">Free</span>';
            case "edu":
                return '<span class="label label-success">Edu</span>';
            case "pro":
                return '<span class="label label-info">Pro</span>';
            default:
                return '<span class="label label-danger">Undefined!</span>';
        }
    },
    getAuthor: function() {
        return Meteor.users.findOne(this.owner).profile.name;
    },
    getLicense: function() {
        var licenseString = "";

        if (this.license.length > 0) {
            if (this.license.includes('by')) { licenseString = licenseString.concat('<img src="/img/by.large.png" alt="Namensnennung" />'); }
            if (this.license.includes('nc')) {
                licenseString = licenseString.concat('<img src="/img/nc-eu.large.png" alt="Nicht kommerziell" />');
            }
            if (this.license.includes('nd')) { licenseString = licenseString.concat('<img src="/img/nd.large.png" alt="Keine Bearbeitung" />'); }
            if (this.license.includes('sa')) { licenseString = licenseString.concat('<img src="/img/sa.large.png" alt="Weitergabe unter gleichen Bedingungen" />'); }

            return new Spacebars.SafeString(licenseString)
        } else {
            return new Spacebars.SafeString('<img src="/img/zero.large.png" alt="Kein Copyright" />');
        }
    }
});

Template.category.events({
    'click .sortTopic': function() {
        var sort = Session.get('poolSortTopic');
        if (sort.name === 1) {
            Session.set('poolSortTopic', {name: -1});
        }
        else {
            Session.set('poolSortTopic', {name: 1});
        }
    },
    'click .filterAutor': function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            Session.set('poolSortAutor', {lastName: -1});
        }
        else {
            Session.set('poolSortAutor', {lastName: 1});
        }
    },
    'click .filterModule': function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            Session.set('poolSort', {name: -1});
        }
        else {
            Session.set('poolSort', {name: 1});
        }
    },
    'click .filterStudy': function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            Session.set('poolSort', {name: -1});
        }
        else {
            Session.set('poolSort', {name: 1});
        }
    },
    'click .filterDepartment': function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            Session.set('poolSort', {name: -1});
        }
        else {
            Session.set('poolSort', {name: 1});
        }
    },
    'click .filterType': function() {
        var sort = Session.get('poolSort');
        if (sort.name === 1) {
            Session.set('poolSort', {name: -1});
        }
        else {
            Session.set('poolSort', {name: 1});
        }
    },
    'change #filterCheckbox': function() {
        var filter = [];
        $("#filterCheckbox input:checkbox:checked").each(function(){
            filter.push($(this).val());
        });
        Session.set('poolFilter', filter);
    }
});

Template.category.onDestroyed(function() {
    Session.set('poolSort', {relevance: -1});
});
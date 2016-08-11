//------------------------ IMPORTS

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Cardsets } from '../../api/cardsets.js';
import { Categories } from '../../api/categories.js';
import { Ratings } from '../../api/ratings.js';

import './pool.html';


Meteor.subscribe("categories");
Meteor.subscribe("cardsets");

Session.setDefault('poolSort', {name: 1});

/**
 * ############################################################################
 * category
 * ############################################################################
 */

Template.category.helpers({
  getDecks: function() {
    var id = parseInt(this._id);
    return Cardsets.find({
      category: id,
      visible: true
    }, {
      sort: Session.get('poolSort')
    });
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
  getKind: function() {
    switch (this.kind) {
      case "free":
        return null;
      case "edu":
        return '<span class="label label-success">Edu</span>';
      case "pro":
        return '<span class="label label-warning">Pro</span>';
      default:
        return null;
      }
  }
});

Template.category.events({
  'click #sortName': function() {
    var sort = Session.get('poolSort');
    if (sort.name === 1) {
      Session.set('poolSort', {name: -1});
    }
    else {
      Session.set('poolSort', {name: 1});
    }
  },
  'click #sortUser': function() {
    var sort = Session.get('poolSort');
    if (sort.username === 1) {
      Session.set('poolSort', {username: -1});
    }
    else {
      Session.set('poolSort', {username: 1});
    }
  }
});

Template.category.onDestroyed(function() {
  Session.set('poolSort', {name: 1});
});

/**
 * ############################################################################
 * helpers
 * ############################################################################
 */

Template.pool.helpers({
  getCount: function(id) {
    return Cardsets.find({
      category: parseInt(id),
      visible: true
    }).count();
  }
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Cards } from './cards.js';
import { Experience } from './experience.js';

export const Cardsets = new Mongo.Collection("cardsets");

if (Meteor.isServer) {
  Meteor.publish("cardsets", function() {
    if (Roles.userIsInRole(this.userId, 'admin-user')) {
      return Cardsets.find();
    }
    else if (this.userId)
    {
      return Cardsets.find({$or: [{visible: true}, {owner: this.userId}]});
    }
  });
}

CardsetsSchema = new SimpleSchema({
  name: {
    type: String
  },
  category: {
    type: Number,
    min: 1,
    max: 13
  },
  description: {
    type: String
  },
  date: {
    type: Date
  },
  owner: {
    type: String
  },
  username: {
    type: String
  },
  visible: {
    type: Boolean
  },
  ratings: {
    type: Boolean
  },
  kind: {
    type: String
  }
});

Cardsets.attachSchema(CardsetsSchema);

CardsetsIndex = new EasySearch.Index({
  collection: Cardsets,
  fields: ['name', 'description'],
  engine: new EasySearch.Minimongo({
    selector: function(searchObject, options, aggregation) {
      // Default selector
      defSelector = this.defaultConfiguration().selector(searchObject, options, aggregation);

      // Filter selector
      selector = {};
      selector.$and = [defSelector, {
        $or: [{
          owner: Meteor.userId()
        }, {
          visible: true
        }]
      }];
      return selector;
    }
  })
});

Meteor.methods({
  addCardset: function(name, category, description, visible, ratings, kind) {
    // Make sure the user is logged in before inserting a cardset
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Cardsets.insert({
      name: name,
      category: category,
      description: description,
      date: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().profile.name,
      visible: visible,
      ratings: ratings,
      kind: kind
    });
    Experience.insert({
      type: 2,
      value: 3,
      date: new Date(),
      owner: Meteor.userId()
    });
    Meteor.call('checkLvl');
  },
  deleteCardset: function(id) {
    // Make sure only the task owner can make a task private
    var cardset = Cardsets.findOne(id);
    if (!Meteor.userId() || cardset.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Cardsets.remove(id);
    Cards.remove({
      cardset_id: id
    });
  },
  updateCardset: function(id, name, category, description, visible, ratings, kind) {
    // Make sure only the task owner can make a task private
    var cardset = Cardsets.findOne(id);
    if (!Meteor.userId() || cardset.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Cardsets.update(id, {
      $set: {
        name: name,
        category: category,
        description: description,
        visible: visible,
        ratings: ratings,
        kind: kind
      }
    });
  }
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import { Cardsets } from './cardsets.js';

export const Paid = new Mongo.Collection("paid");

if (Meteor.isServer) {
    Meteor.publish("paid", function() {
        if (this.userId) {
            return Paid.find({
              $or: [
                {user_id: this.userId},
                {cardset_id: {$in: Cardsets.find({owner: this.userId}).map(function(doc) {return doc._id})}}
              ]
            });
        }
    });
}

Meteor.methods({
  addPaid: function(cardset_id, amount) {
    // Make sure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Paid.insert({
      cardset_id: cardset_id,
      user_id: Meteor.userId(),
      date: new Date(),
      amount: amount
    });
  }
});

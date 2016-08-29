//------------------------ IMPORTS

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { Experience } from '../../api/experience.js';
import { Badges } from '../../api/badges.js';
import { Cardsets } from '../../api/cardsets.js';
import { Cards } from '../../api/cards.js';
import { Learned } from '../../api/learned.js';
import { Ratings } from '../../api/ratings.js';
import { Paid } from '../../api/paid.js';
import { Notifications } from '../../api/notifications.js';

import { userData } from '../../api/userdata.js';

import './profile.html';


Meteor.subscribe("experience");
Meteor.subscribe("badges");
Meteor.subscribe("notifications");
Meteor.subscribe("userData");
Meteor.subscribe("cardsets");

Template.registerHelper("getUser", function() {
  var user = Meteor.users.findOne(Router.current().params._id);
  Session.set("user", user);
  return user;
});
Template.registerHelper("isUser", function() {
  return Router.current().params._id === Meteor.userId();
});

/**
 * ############################################################################
 * profile
 * ############################################################################
 */

Template.profile.helpers({
  isVisible: function() {
    var userId = Router.current().params._id;
    if (userId !== undefined) {
      var user = Meteor.users.findOne(userId);
      if (user !== undefined) {
        return userId === Meteor.userId() || user.visible;
      }
    }
    return null;
  }
});

/**
 * ############################################################################
 * profileSidebar
 * ############################################################################
 */

Template.profileSidebar.helpers({
  getService: function() {
    var userId = Router.current().params._id;
    if (userId !== undefined) {
      var user = Meteor.users.findOne(userId);
      if (user !== undefined) {
        if (user.services !== undefined){
          var service = _.keys(user.services)[0];
          service = service.charAt(0).toUpperCase() + service.slice(1);
          return service;
        }
      }
    }
    return null;
  }
});

/**
 * ############################################################################
 * profileInfo
 * ############################################################################
 */

Template.profileSettings.events({
  "click #profilepublicoption1": function(event, template) {
    Meteor.call("updateUsersVisibility", true);
  },
  "click #profilepublicoption2": function(event, template) {
    Meteor.call("updateUsersVisibility", false);
  },
  "keyup #inputEmail": function(event, template) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var email = $(event.currentTarget).val();
    var check = re.test(email);

    if (check === false && email !== "") {
      $(event.currentTarget).parent().parent().addClass('has-error');
    } else {
      $(event.currentTarget).parent().parent().removeClass('has-error');
      $(event.currentTarget).parent().parent().addClass('has-success');
      Meteor.call("updateUsersEmail", email);
    }
  }
});

/**
 * ############################################################################
 * profileMembership
 * ############################################################################
 */

 Template.profileMembership.rendered = function(){
   if ($('#subscribe-form').length) {
     Meteor.call('getClientToken', function(error, clientToken) {
      if (error) {
        throw new Meteor.Error(err.statusCode, 'Error getting client token from braintree');
      } else {
        braintree.setup(clientToken, "dropin", {
          container: "subscribe-form",
          onPaymentMethodReceived: function (response) {
            $('#upgrade').prop( "disabled", true );

            Bert.alert('In progress!', 'info', 'growl-bottom-right');
            var nonce = response.nonce;
            var plan = Session.get('plan');
            Meteor.call('btSubscribe', nonce, plan, function(error, success) {
              if (error) {
                throw new Meteor.Error(error.message, 'error');
              } else {
                Bert.alert('Thank you for your subscription!', 'success', 'growl-bottom-right');
              }
            });
          }
        });
      }
    });
   }
 }

Template.profileMembership.events({
    "click #upgrade": function() {
        Session.set('plan', 'pro');
    },
    "click #downgrade": function() {
        var hasPro = Cardsets.find({owner: Meteor.userId()}).count();
        if (hasPro > 0) {
          Bert.alert('You can not downgrade if you have pro-cardsets!', 'danger', 'growl-bottom-right');
        } else {
          var confirmCancel = confirm("Are you sure you want to cancel? This means your subscription will no longer be active and your account will be disabled on the cancellation date. If you'd like, you can resubscribe later.");
          if (confirmCancel){
            $('#downgrade').prop( "disabled", true );
            Session.set('plan', 'standard');

            Meteor.call('btCancelSubscription', function(error, response){
              if (error){
                Bert.alert(error.reason, "danger", 'growl-bottom-right');
              } else {
                if (response.error){
                  Bert.alert(response.error.message, "danger", 'growl-bottom-right');
                } else {
                  Session.set('currentUserPlan_' + Meteor.userId(), null);
                  Bert.alert('Subscription successfully canceled!', 'success', 'growl-bottom-right');
                }
              }
            });
          }
        }
    },
    "click #sendLecturerRequest": function() {
        var name = $('#inputName').val();
        var prename = $('#inputPrename').val();

        if (name === '' || prename === ''){
          Bert.alert('Geben Sie Ihren Vor- und Nachnamen an', 'danger', 'growl-bottom-right');
        }
        else {
          var text = prename + " " + name + " möchte Dozent werden. Jetzt im Back-End freischalten.";
          var type = "Dozenten Anfrage";
          var target = "admin";

          Meteor.call("addNotification", target, type, text);
          Bert.alert('Anfrage wurde gesendet', 'success', 'growl-bottom-right');
          document.getElementById("lecturerRequestForm").reset();
        }
    },
});


/**
 * ############################################################################
 * profileBilling
 * ############################################################################
 */

Template.profileBilling.helpers({
    getInvoices: function() {
      return Paid.find({user_id: Meteor.userId()});
    },
    getRevenue: function() {
      var cardsetsIds = Cardsets.find({
        owner: Meteor.userId()
      }).map(function (cardset) {return cardset._id; });

      return Paid.find({cardset_id: {$in: cardsetsIds}});
    },
    getCardsetName: function(cardset_id) {
      return (cardset_id !== undefined) ? Cardsets.findOne(cardset_id).name : undefined;
    },
    getBalance: function() {
      Meteor.subscribe("privateUserData");
      var balance = Meteor.users.findOne(Meteor.userId).balance;
      return (balance !== undefined) ? balance : 0;
    }
});


/**
 * ############################################################################
 * profileXp
 * ############################################################################
 */

Template.profileXp.helpers({
  getXpTotal: function() {
    var allXp = Experience.find({
      owner: Router.current().params._id
    });
    var result = 0;
    allXp.forEach(function(xp) {
      result = result + xp.value;
    });
    Session.set("totalXp", result);
    return result;
  },
  getXpToday: function() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    var allXp = Experience.find({
      owner: Router.current().params._id,
      date: {
        $gte: date
      }
    });
    var result = 0;
    allXp.forEach(function(xp) {
      result = result + xp.value;
    });
    return result;
  },
  getXpYesterday: function() {
    var minDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    minDate.setHours(0, 0, 0, 0);
    var maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    var allXp = Experience.find({
      owner: Router.current().params._id,
      date: {
        $gte: minDate,
        $lte: maxDate
      }
    });
    var result = 0;
    allXp.forEach(function(xp) {
      result = result + xp.value;
    });
    return result;
  },
  getXpWeek: function() {
    var minDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    minDate.setHours(0, 0, 0, 0);
    var maxDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    maxDate.setHours(0, 0, 0, 0);

    var allXp = Experience.find({
      owner: Router.current().params._id,
      date: {
        $gte: minDate,
        $lte: maxDate
      }
    });
    var result = 0;
    allXp.forEach(function(xp) {
      result = result + xp.value;
    });
    return result;
  },
  getLast: function() {
    var last = Experience.findOne({
      owner: Router.current().params._id
    }, {
      sort: {
        date: -1
      }
    });

    var name = '';
    if (last !== undefined) {
      switch (last.type) {
        case 1:
          name = TAPi18n.__('panel-body-last.login');
          break;
        case 2:
          name = TAPi18n.__('panel-body-last.cardset');
          break;
        case 3:
          name = TAPi18n.__('panel-body-last.card');
          break;
        case 4:
          name = TAPi18n.__('panel-body-last.rating');
          break;
        default:
          name = 'Error';
          break;
      }
    }

    if (last === undefined)
      return null;

    return name + " (+" + last.value + ")";
  },
  getLvl: function() {
    return getLvl();
  },
  getNextLvl: function() {
    return getLvl() + 1;
  },
  getXp: function() {
    Meteor.call('checkLvl');

    var level = getLvl() + 1;
    var points = xpForLevel(level);
    var required = points - Session.get("totalXp");

    return required;
  },
  getXpPercent: function() {
    var points = Session.get("totalXp");
    var currentLevel = getLvl();
    var nextLevel = getLvl() + 1;
    var currentPoints = xpForLevel(currentLevel);
    var nextPoints = xpForLevel(nextLevel);

    var res = (points - currentPoints) / (nextPoints - currentPoints) * 100;

    return res + "%";
  }
});

function getLvl() {
  var user = Meteor.users.findOne(Router.current().params._id);
  if (user === undefined) {
    return null;
  }
  return user.lvl;
}

function xpForLevel(level) {
  var points = 0;

  for (i = 1; i < level; i++) {
    points += Math.floor(i + 30 * Math.pow(2, i / 10));
  }
  return Math.floor(points / 4);
}

/**
 * ############################################################################
 * profileBadges
 * ############################################################################
 */

Template.profileBadges.helpers({
  getBadges: function() {
    return Badges.find();
  },
  isGained: function(index, rank) {
    switch (index) {
      case 0:
        return kritiker(rank) >= 100;
      case 1:
        return krone(rank) >= 100;
      case 2:
        return stammgast(rank) >= 100;
      case 3:
        return streber(rank) >= 100;
      case 4:
        return wohltaeter(rank) >= 100;
      case 5:
        return bestseller(rank) >= 100;
      default:
        return false;
    }
  },
  getPercent: function(index, rank) {
    switch (index) {
      case 0:
        return kritiker(rank);
      case 1:
        return krone(rank);
      case 2:
        return stammgast(rank);
      case 3:
        return streber(rank);
      case 4:
        return wohltaeter(rank);
      case 5:
        return bestseller(rank);
      default:
        return 0;
    }
  }
});

function kritiker(rank) {
  var ratings = Ratings.find({
    user: Meteor.userId()
  }).count();

  var badge = Badges.findOne("1");
  switch (rank) {
    case 3:
      return ratings / badge.rank3 * 100;
    case 2:
      return ratings / badge.rank2 * 100;
    case 1:
      return ratings / badge.rank1 * 100;
    default:
      return 0;
  }
}

function krone(rank) {
  var cardsets = Cardsets.find({
    owner: Meteor.userId()
  });

  var count = 0;

  cardsets.forEach(function(cardset) {
    var ratings = Ratings.find({
      cardset_id: cardset._id
    });
    if (ratings.count() > 1) {
      var total = 0;
      ratings.forEach(function(rating) {
        total += rating.rating;
      });
      if (total / ratings.count() >= 4.5) {
        count++;
      }
    }
  }); 

  var badge = Badges.findOne("2");
  switch (rank) {
    case 3:
      return count / badge.rank3 * 100;
    case 2:
      return count / badge.rank2 * 100;
    case 1:
      return count / badge.rank1 * 100;
    default:
      return 0;
  }
}

function stammgast(rank) {
    var user = Meteor.users.findOne(Meteor.userId()).daysInRow;

    var badge = Badges.findOne("3");
    switch (rank) {
      case 3:
        return user / badge.rank3 * 100;
      case 2:
        return user / badge.rank2 * 100;
      case 1:
        return user / badge.rank1 * 100;
      default:
        return 0;
    }
}

function streber(rank) {
  var learned = Learned.find({
    user_id: Meteor.userId()
  }).count();

  var badge = Badges.findOne("4");
  switch (rank) {
    case 3:
      return learned / badge.rank3 * 100;
    case 2:
      return learned / badge.rank2 * 100;
    case 1:
      return learned / badge.rank1 * 100;
    default:
      return 0;
  }
}

function wohltaeter(rank) {
  var cardsets = Cardsets.find({
    owner: Meteor.userId(),
    visible: true
  });

  var count = 0;

  cardsets.forEach(function(cardset) {
    var cards = Cards.find({
      cardset_id: cardset._id
    });
    if (cards.count() >= 5) {
      count++;
    }
  }); 

  var badge = Badges.findOne("5");
  switch (rank) {
    case 3:
      return count / badge.rank3 * 100;
    case 2:
      return count / badge.rank2 * 100;
    case 1:
      return count / badge.rank1 * 100;
    default:
      return 0;
  }
}

function bestseller(rank) {
  var cardsetsIds = Cardsets.find({
    owner: Meteor.userId()
  }).map(function (cardset) {return cardset._id; });

  var learner = Learned.find({
    cardset_id: {$in: cardsetsIds}
  }).count();

  var badge = Badges.findOne("6");
  switch (rank) {
    case 3:
      return learner / badge.rank3 * 100;
    case 2:
      return learner / badge.rank2 * 100;
    case 1:
      return learner / badge.rank1 * 100;
    default:
      return 0;
  }
}

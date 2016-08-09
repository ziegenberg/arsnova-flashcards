ServiceConfiguration.configurations.remove({
    service: 'facebook'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});

ServiceConfiguration.configurations.remove({
    service: 'google'
});

ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: Meteor.settings.facebook.api,
    secret: Meteor.settings.facebook.secret
});

ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: Meteor.settings.twitter.api,
    secret: Meteor.settings.twitter.secret
});

ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: Meteor.settings.google.api,
    secret: Meteor.settings.google.secret
});


Meteor.users.after.insert(function (userId, doc) {
  if(doc.profile.name === 'mzmn17')
  {
    Roles.addUsersToRoles(doc._id, ['admin-user']);
  }
  else
  {
    Roles.addUsersToRoles(doc._id, ['normal-user']);
  }
});

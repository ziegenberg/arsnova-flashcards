Session.setDefault('showCardsetForm', false);

Template.cardsets.events({
    'click .saveSet': function(evt, tmpl){
      Session.set('showCardsetForm', true);
    }
})

Template.cardsets.showCardsetForm = function(){
  return Session.get('showCardsetForm');
}

Template.created.cardsetList = function() {
  return Cardsets.find();
}

Template.cardsetForm.events({
  'click .save': function(evt, tmpl){
    var name = tmpl.find('#newSetName').value;
    var category = tmpl.find('#newSetCategory').value;
    var description = tmpl.find('#newSetDescription').value;
    addCardset(name, category, description);
    Session.set('showCardsetForm', false);
  },
  'click .cancel': function(evt, tmpl){
    Session.set('showCardsetForm', false);
  }
})

var addCardset = function(name, category, description) {
  Cardsets.insert({name: name, category: category, description: description});
}

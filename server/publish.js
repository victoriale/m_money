ListHub = new Mongo.Collection('listings');
Meteor.publish('listings', function(opens, construction, city, state, bednum, bathnum, minyearnum, maxyearnum, minpricenum, maxpricenum, lotsize, livingarea, mlsid){


return ListHub.find({ $and:[  {"Address.City": city}, {"Address.StateOrProvince": state}, {"OpenHouses": opens}, {"DetailedCharacteristics.IsNewConstruction": construction}, {"Bedrooms": bednum}, {"Bathrooms": bathnum}, {"LotSize": {$gt: lotsize - 2, $lt: lotsize + 2}}, {"LivingArea": {$gt: livingarea - 1000, $lt: livingarea + 1000}}, {"MlsId": mlsid}, {"YearBuilt": {$gt: minyearnum, $lt: maxyearnum}}, {"ListPrice": { $gt: minpricenum, $lt: maxpricenum}} ]});

});


Meteor.publish('partnerData', function(){
  _corp_id = Meteor.users.findOne({_id: this.userId}).profile.corp;
  Corporate.find({_id: _corp_id}, {fields: {name: true, description: true}});
  //Get Array of pub ids
  _pub_id_array = Publisher.find({_corp_id: _corp_id}, {fields: {_id: true}}).fetch();

  pubArray = [];
  //Convert array of objects to an array
  for(c=0; c < _pub_id_array.length; c++){
    pubArray.push(_pub_id_array[c]._id);
  }
  //Return all needed data
  return [
      Corporate.find({_id: _corp_id}, {fields: {name: true, description: true}}),
      Publisher.find({_corp_id: _corp_id}, {fields: {name: true, description: true}}),
      Site.find({_pub_id: {$in: pubArray}}, {fields: {name: true, _pub_id: true}})
  ];
})

if(!Publisher.find().count()){
  Corporate.insert({
    _id: 'tribune',
    name: 'Tribune',
    description: 'Tribune Description blah blah blah'
  });
  Publisher.insert({
    _id: 'latimes',
    _corp_id: 'tribune',
    name: 'LA Times',
    description: 'LA Times Descrption bluh bluh bluh'
  });
  Site.insert({
    _pub_id: 'latimes',
    name: 'latimes.com'
  });
  Publisher.insert({
    _id: 'chicagotribune',
    _corp_id: 'tribune',
    name: 'Chicago Tribune',
    description: 'Chicago Tribune Descrption bluh bluh bluh'
  });
  Site.insert({
    _pub_id: 'chicagotribune',
    name: 'chicagotribune.com'
  });
}

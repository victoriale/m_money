/*<!--Author: [Thanush Subramanian Elango]
Created: [06/26/2015]
Description: [Similar Neighborhoods]
Associated Files: [similar_neighborhood.less][similar_neighborhood.html]!-->*/

Template.similar_neighborhoods.onRendered(function(){
  var neighborhood_count = 0;
  Session.set("neighborhood_count", neighborhood_count);
});

////Creating Button Click for navigation ////
Template.similar_neighborhoods.events({
  ////Right click increments counter each time when the right navigation button is pressed/////
  'click .myframe_neighborhood_all-myframe_right_button': function() {
    var data = Session.get("similar_neighborhoods");
    var counter = Session.get("neighborhood_count");
    if(counter < data.length - 1){
      counter++;
      Session.set("neighborhood_count", counter);
    }
  },

  /////Left Button increments counter when each time when the left navigation button is pressed//////
  'click .myframe_neighborhood_all-myframe_left_button': function() {
    var counter = Session.get("neighborhood_count");
    if(counter > 0){
      counter--;
      Session.set("neighborhood_count", counter);
    }
  }
})



Template.similar_neighborhoods.helpers({

  //////Data for the City//////
  location: function(){
    var  data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return data.city + (", ") + data.state;
  },

  ////Data for the State/////
  neighborhood: function(){
    var data = Session.get("similar_neighborhoods");
    var counter = Session.get("neighborhood_count");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter].neighborhood;
  },

  /////Data for the neighborhood names/////
  listings: function(){
    var data = Session.get("similar_neighborhoods");
    var counter = Session.get("neighborhood_count");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter].listings;
  },
})

Template.nearby_schools.onCreated(function(){
  Session.set("nscounter",0);
});

//event handling for left and right navigation button
Template.nearby_schools.events({
  'click .module-nearby-nav-fix-right': function() {
    var data = Session.get("nearby_schools");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var nscounter = Session.get("nscounter");
    if(nscounter < data["schools"].length - 1){
      nscounter++;
    } else {
      nscounter = 0;
    }
    Session.set("nscounter", nscounter);
  },
  'click .module-nearby-nav-fix-left': function() {
    var data = Session.get("nearby_schools");
    if ( typeof data == "undefined" ) {
      return "";
    }
    nscounter = Session.get("nscounter");
    if(nscounter > 0){
      nscounter--;
    } else {
      nscounter = data["schools"].length - 1;
    }
    Session.set("nscounter", nscounter);
  }
})


Template.nearby_schools.helpers({
  imgURL: function() {
    var data = Session.get("nearby_schools");
    var counter = Session.get("nscounter");
    if ( typeof data == "undefined" ) {
      return "";
    }
    if ( typeof data['schools'][counter].image_url == "undefined" ) {
      var subInd = data['schools'][counter]['grade_level'].length - 1;
      return "/stock/small_Schools/" + data['schools'][counter]['grade_level'][subInd].toLowerCase() + "_stockimage1.jpg";
    }
  },

  location: function(){
    var moredata = Session.get("profile_header");
    if ( typeof moredata == "undefined" ) {
      return "";
    }
    return moredata.city + (", ") + moredata.state;
  },

  schools: function(){
    if(Session.get("isListing")){
      var data = Session.get("nearby_schools");
      if ( typeof data == "undefined" ) {
        return "";
      }
      var SchoolNum = 0;
      for ( var name in data["counts"] ) {
        SchoolNum += data["counts"][name];
      }
      return SchoolNum;
    }
  },

  SchoolName: function(){
    var schoolIndex = Session.get("nscounter");
    var schools = Session.get("nearby_schools");
    if ( typeof schools == "undefined" ) {
      return "";
    }
    return schools['schools'][schoolIndex]['name'];
  },

  SchoolType: function(){
    var schoolIndex = Session.get("nscounter");
    var schools = Session.get("nearby_schools");
    if ( typeof schools == "undefined" ) {
      return "";
    }
    return schools['schools'][schoolIndex]['type'];
  },

  elementary: function(){
    if(Session.get("isListing")){
      var data = Session.get("nearby_schools");
      index = Session.get("nscounter");
      return data["counts"]["Elementary"];
    }
    else {

    }
  },

  high: function(){
    if(Session.get("isListing")){
      var data = Session.get("nearby_schools");
      index = Session.get("nscounter");
      return data["counts"]["High"];
    }else {
      ///location code
      return "";
    }
  },

  middle: function(){
    if(Session.get("isListing")){
      var data = Session.get("nearby_schools");
      index = Session.get("nscounter");
      return data["counts"]["Middle"];
    }else {
      ///location code
      return "";
    }
  },
  preschool: function(){
    if(Session.get("isListing")){
      var data = Session.get("nearby_schools");
      if ( typeof data == "undefined" ) {
        return "";
      }
      return data["counts"]["Preschool"];
    }else {
      ///location code
      return "";
    }
  },
  AllURL: function() {
    var data = Session.get("images_media");
    if ( typeof data == "undefined" ) {
      return false;
    }
    return Router.path('content.realestate.schools.listing',{
      listing_id: data['listing_key']
    });
  },
  ElementaryURL: function() {
    var data = Session.get("images_media");
    if ( typeof data == "undefined" ) {
      return false;
    }
    return Router.path('content.realestate.schools.listing',{
      listing_id: data['listing_key'],
      category: 'elementary'
    });
  },
  MiddleURL: function() {
    var data = Session.get("images_media");
    if ( typeof data == "undefined" ) {
      return false;
    }
    return Router.path('content.realestate.schools.listing',{
      listing_id: data['listing_key'],
      category: 'middle'
    });
  },
  HighURL: function() {
    var data = Session.get("images_media");
    if ( typeof data == "undefined" ) {
      return false;
    }
    return Router.path('content.realestate.schools.listing',{
      listing_id: data['listing_key'],
      category: 'high'
    });
  },
  PreschoolURL: function() {
    var data = Session.get("images_media");
    if ( typeof data == "undefined" ) {
      return false;
    }
    return Router.path('content.realestate.schools.listing',{
      listing_id: data['listing_key'],
      category: 'preschool'
    });
  }
})

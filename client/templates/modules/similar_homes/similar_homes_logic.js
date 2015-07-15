//on mondule render create a counter to be used
Template.similar_homes.onCreated(function(){
  Session.set("similar_homes_index",0);
})

Template.similar_homes.onRendered(function(){
  $('.frameslisting-navigation-button-right').mousedown(function(){ return false; });
  $('.frameslisting-navigation-button-left').mousedown(function(){ return false; });
})


//event to scroll through carousel
Template.similar_homes.events({

  'click .frameslisting-container .navigation-button-right': function(){
    var image = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if(counter < image.length - 1){
      counter++;
    }else{
      counter = 0;
    }
    Session.set("similar_homes_index", counter);
  },

  'click .frameslisting-container .navigation-button-left': function(){
    var image = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if(counter > 0){
      counter--;
    }else if(counter == 0){
      counter = image.length - 1;
    }
    Session.set("similar_homes_index", counter);
  },

  //click event to change current carousel image is needed to be shown on the bottom of the listings
  'click .frameslisting-sc1': function(event){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    $('.frameslisting-container').css("background-image",$(event.target)[0].style.backgroundImage);
  },
  'click .frameslisting-calloutbtn': function(){
    var counter = Session.get("similar_homes_index");
    var data = Session.get("similar_homes");
    ListingRedirect(data[counter]['listing_key']);
  },
})

//helper classes will replaces the necessary information
Template.similar_homes.helpers({
  location: function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter].city + (", ") + data[counter].state;
  },
  neighborhood: function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter].neighborhood;
  },
  address: function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter].street_address;
  },
  price: function(){
    var  data = Session.get("similar_homes");
    var  counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return ("$")+NumberToCommaNumber(data[counter].list_price);
  },
  agency: function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    if(data[counter].realtor_company != undefined){
      return (" - ")+data[counter].realtor_company;
    } else {
      return "";
    }
  },
  imagecounter: function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter]["photos"].length;
  },
  MainImgURL: function() {
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return data[counter]['photos'][0];
  },
  SubImgURL:function(){
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    var ReturnArray = new Array();
    for ( var index = 0; index < 5; index++ ) {
      ReturnArray[index] = new Object();
      if ( typeof data[counter]['photos'][index] == "undefined" ) {
        ReturnArray[index]['ImgURL'] = "";
      } else {
        ReturnArray[index]['ImgURL'] = data[counter]['photos'][index];
      }
    }
    return ReturnArray;
  },
  virtualtourURL: function() {
    var tours = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof tours == "undefined" || typeof counter == "undefined" || typeof tours[counter] == "undefined" || typeof tours[counter]['virtual_tours'] == "undefined" || tours[counter]['virtual_tours'].length == 0 ) {
      return false;
    }
    return false;
    return tours[counter]['virtual_tours'][0];
  },
  ListingURL: function() {
    var data = Session.get("similar_homes");
    var counter = Session.get("similar_homes_index");
    if ( typeof data == "undefined" || typeof data[counter] == "undefined" ) {
      return "";
    }
    return ListingURL(data[counter]['listing_key']);
  }
})

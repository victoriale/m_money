Template.amenities.onCreated(function(){
  var counter = 0;
  Session.set("amenities_count", counter);
})

//set click event to change the the top featured list and display new image
Template.amenities.events({
  'click .image-panel_nav-right': function() {
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if(counter < data["businesses"].length - 1){
      counter++;
      Session.set("amenities_count", counter);
      $(".image-panel_profile-image").css("background-image","url('"+ data["businesses"][counter].image_url +"')");
    }
  },
  'click .image-panel_nav-left': function() {
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if(counter > 0){
      counter--;
      Session.set("amenities_count", counter);
      $(".image-panel_profile-image").css("background-image","url('"+ data["businesses"][counter].image_url +"')");
    }
  },
})

Template.amenities.helpers({
  location: function(){
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if ( typeof data == "undefined" || typeof data['businesses'][counter] == "undefined" ) {
      return "";
    }
    return data['businesses'][counter].city + (', ') + data["businesses"][counter].state;
  },
  name: function(){
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if ( typeof data == "undefined" || typeof data['businesses'][counter] == "undefined" ) {
      return "";
    }
    return data['businesses'][counter].name;
  },
  address: function(){
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if ( typeof data == "undefined" || typeof data['businesses'][counter] == "undefined" ) {
      return "";
    }
    return data['businesses'][counter].street_address + (', ') + data["businesses"][counter].zipcode;
  },
  MainImg: function(){
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if ( typeof data == "undefined" || typeof data['businesses'][counter] == "undefined" ) {
      return "";
    }
    return data["businesses"][counter].image_url;
  },
  MainURL: function() {
    var data = Session.get("amenities");
    var counter = Session.get("amenities_count");
    if ( typeof data == "undefined" || typeof data['businesses'][counter] == "undefined" ) {
      return "";
    }
    return data['businesses'][counter].url;
  },
  RestaurantsURL: function() {
    if ( Session.get('isListing') ) {
      var data = Session.get("images_media");
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities.listing',{
        listing_id: data['listing_key'],
        category: 'restaurant'
      });
    } else {
      var data = Session.get('profile_header');
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities',{
        state_id: data['state'],
        city_id: data['city'],
        category: 'restaurant'
      });
    }
  },
  GroceryURL: function() {
    if ( Session.get('isListing') ) {
      var data = Session.get("images_media");
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities.listing',{
        listing_id: data['listing_key'],
        category: 'grocery'
      });;
    } else {
      var data = Session.get('profile_header');
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities',{
        state_id: data['state'],
        city_id: data['city'],
        category: 'grocery'
      });
    }
  },
  BanksURL: function() {
    if ( Session.get('isListing') ) {
      var data = Session.get("images_media");
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities.listing',{
        listing_id: data['listing_key'],
        category: 'bank'
      });
    } else {
      var data = Session.get('profile_header');
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities',{
        state_id: data['state'],
        city_id: data['city'],
        category: 'bank'
      });
    }
  },
  AmenitiesURL: function() {
    if ( Session.get('isListing') ) {
      var data = Session.get("images_media");
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities.listing',{
        listing_id: data['listing_key']
      });
    } else {
      var data = Session.get('profile_header');
      if ( typeof data == "undefined" ) {
        return false;
      }
      return Router.path('content.realestate.amenities',{
        state_id: data['state'],
        city_id: data['city']
      });
    }
  }
})

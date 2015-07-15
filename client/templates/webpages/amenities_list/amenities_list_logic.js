Template.amenities_list.helpers({
  PageTitle: function() {
    return "Amenities near " + Session.get("AmenitiesCity") + ", " + Session.get("AmenitiesState");
  },
  ListItems: function() {
    var data = Session.get("amenities_list_info");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var ReturnArray = new Array();
    for ( var index = 0; index < data['businesses'].length; index++ ) {
      var LocalData = data['businesses'][index];
      if ( index%2 == 0 ) {
        LocalData.class = "amenities_list_even";
      } else {
        LocalData.class = "amenities_list_odd";
      }
      LocalData.AgencyNum = (index%4 + 1);
      ReturnArray[index] = LocalData;
    }
    return ReturnArray;
  },
  NextURL: function(){
    var skip = Session.get("AmenitiesSkip");
    var data = Session.get("amenities_list_info");
    if ( typeof data == "undefined" || data['total_businesses'] < (parseInt(skip) + 20) ) {
      return false;
    }
    if ( typeof Session.get("AmenitiesListing") != "undefined" ) {
      return Router.path('content.realestate.amenities.listing.skip',{
        listing_id: Session.get("AmenitiesListing"),
        category: Session.get("AmenitiesCategory"),
        skip: parseInt(skip) + 20
      });
    } else {
      return Router.path('content.realestate.amenities.skip',{
        city_id: Session.get("AmenitiesCity"),
        state_id: Session.get("AmenitiesState"),
        category: Session.get("AmenitiesCategory"),
        skip: parseInt(skip) + 20
      });
    }
  }
});

/*Author : Viany Vittal Karagod
Date Created:06/26/2015
Description:Real Estate Property Listing Breakdown Frame Spec. Which gives details
about the property its views and the list of all the available properties
Associated files: global_var.less,property_breakdown.css,module.css,property_breakdown.html*/

DaysSinceDate = function(OldDate) {
  var d = new Date();
  d = d.getTime();
  var TimeDiff = d - (OldDate * 1000);
  TimeDiff = Math.floor(TimeDiff/(24*60*60*1000));
  var ReturnString = TimeDiff + " day";
  if ( TimeDiff != 1 ) {
    ReturnString = ReturnString + "s";
  }
  return ReturnString;
}

function GetFeatureData (FindObject, data, currentIndex) {
  var objIndex = 0;
  var ReturnData = new Array();
  var localIndex = 0;
  while ( localIndex < (6 - currentIndex) && objIndex < FindObject.length ) {
    var objData = data['features'];
    if ( FindObject[objIndex]['Room'] ) {
      objData = objData['rooms'];
    }
    objData = objData[FindObject[objIndex]['Name']];
    if ( typeof objData != 'undefined' ) {
      ReturnData[localIndex] = new Object();
      ReturnData[localIndex]['Data'] = FindObject[objIndex]['HTML'];
      if ( typeof objData == 'Array' ) {
        for ( var index = 0; index < objData.length; index++ ) {
          ReturnData[localIndex]['Data'] = ReturnData[localIndex]['Data'] + objData[index];
          if ( index < objData.length - 1 ) {
            ReturnData[localIndex]['Data'] = ReturnData[localIndex]['Data'] + ", ";
          }
        }
      } else {
        ReturnData[localIndex]['Data'] = ReturnData[localIndex]['Data'] + objData;
        ReturnData[localIndex]['Data'] = ReturnData[localIndex]['Data'].replace(/,/g,", ");
        ReturnData[localIndex]['Data'] = ReturnData[localIndex]['Data'].replace(/\.0/g,"");
      }
      localIndex++;
    }
    objIndex++;
  }
  return ReturnData;
}


Template.property_breakdown.events({
  'click .property_breakdown-bluebutton': function(){
    Router.go("content.property.features",{
      listing_id: Session.get("images_media")['listing_key'],
      partner_id: Session.get("partner_id")
    });
  }
})

Template.property_breakdown.helpers({
  listing_image: function() {
    var data = Session.get("profile_header");
    if ( typeof data != "undefined" ) {
      return data['photo'];
    }
  },
  isListing: function(){
    return Session.get('isListing');
  },
  ListingViews: function(){ // To get the count of views
    return false;
  },

  Address_info: function(){ // To get the address
    if(Session.get("isListing")){
      var propdata = Session.get("listing_breakdown");
      if ( typeof propdata != "undefined" ) {
        return propdata.street_address;
      }
    }
  },

  Locate : function(){ // To get city,state,postalcode,name
    if(Session.get("isListing")){
      var propdata = Session.get("listing_breakdown");
      var moredata = Session.get("profile_header");
      var ReturnString = "";
      if ( typeof propdata != "undefined" ) {
        ReturnString = propdata.city + ", " + propdata.state;
      }
      if ( typeof moredata != "undefined" && moredata.neighborhood != null ) {
        ReturnString = ReturnString + " > " + moredata.neighborhood;
      }
      return ReturnString;
    }
  },

  FeaturesList1: function(){
    var ReturnData = new Array();
    var data = Session.get("listing_breakdown");
    //var profile_data = Session.get("profile_header");
    if ( typeof data != "undefined" ) {
      var currentIndex = 0;
      ReturnData[currentIndex] = new Object();
      ReturnData[currentIndex]['Data'] = "Price: $" + NumberToCommaNumber(data.list_price);
      currentIndex++;
      var FindObject = [{Name: "CoolingSystem", HTML: "Cooling: "},
        {Name: "HeatingSystem", HTML: "Heating: "},
        {Name: "RoofType", HTML: "Roofing: "},
        {Name: "appliance", HTML: "Appliances: "},
        {Name: "FloorCovering", HTML: "Flooring: "},
        {Name: "NumFloors", HTML: "Floors: "},
        {Name: "ParkingType", HTML: "Parking: "}
      ];
      var SecondData = GetFeatureData(FindObject, data, currentIndex);
      ReturnData = ReturnData.concat(SecondData);
      return ReturnData;
    }
  },

  FeaturesList2: function(){
    var ReturnData = new Array();
    var data = Session.get("listing_breakdown");
    //var profile_data = Session.get("profile_header");
    if ( typeof data != "undefined" ) {
      var currentIndex = 0;
      var FindObject = [
        {Name: "Bedroom", HTML: "Bedrooms: ", Room: true},
        {Name: "Full Bath", HTML: "Full Bath: ", Room: true},
        {Name: "Half Bath", HTML: "Half Bath: ", Room: true},
        {Name: "Kitchen", HTML: "Kitchens: ", Room: true},
        {Name: "Living Room", HTML: "Living Room: ", Room: true},
        {Name: "ArchitectureStyle", HTML: "Architecture: "}
      ];
      var SecondData = GetFeatureData(FindObject, data, currentIndex);
      ReturnData = ReturnData.concat(SecondData);
      return ReturnData;
    }
  },
  DaysOnMarket: function() {
    if(Session.get("isListing")) {
      var data = Session.get("listing_breakdown");
      var d = new Date();
      var d = d.getTime();
      if ( typeof data == "undefined" || typeof data['listing_date_ut'] == "undefined" || data['listing_date_ut']*1000 > d ) {
        return "";
      }
      return DaysSinceDate(data['listing_date_ut']);
    }
  }
});

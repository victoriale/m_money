NumberToCommaNumber = function(Number) {
  return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function EpochToDate(EpochSec) {
  var d = new Date(EpochSec);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  return month + "/" + day + "/" + year;
}

//will search each object in the array, will find and return needed object data.
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
  function counterIndex(index){
    var imagedata =  Session.get("images_media")['photos'];
    var next = index;
    next = imageCheck(index);
    var arr_image = new Array();
    for(i = 0; i < 5; i++){
      next = imageCheck(next++);
        arr_image[i] = new Object();
        arr_image[i]['index'] = i;
        arr_image[i]["photos"] = imagedata[next];
      next++;
    };
    Session.set("features_subimage", arr_image);
  }
  function imageCheck(index){
    var max = Session.get("images_media")['photos'].length;
    if(index >= max){
      index = 0;
      return index;
    }else if(index < 0){
      index = (max - 1);
      return index;
    }else{
      return index;
    }
  }
Template.property_features.onRendered(function(){
  $('.prop_feat-buttonright').mousedown(function(){ return false; });
  $('.prop_feat-buttonleft').mousedown(function(){ return false; });
})

Template.property_features.onCreated(function(){
  Session.set("property_features_index", 0);
})


Template.property_features.events({
  'click .prop_feat-buttonright': function() {
    var counter = Session.get("property_features_index");
    counter++;
    counterIndex(counter);
    Session.set("property_features_index", imageCheck(counter));
  },
  'click .prop_feat-buttonleft': function() {
    var counter = Session.get("property_features_index");
    counter--;
    counterIndex(counter);
    Session.set("property_features_index", imageCheck(counter));
  },
  'click [class*="prop_feat-imagelists-li"]': function(event) {
    var ClickedElem = event.target;
    var ClassName = ClickedElem.style['background-image'];
    $('.prop_feat-image').css('background-image',ClassName);
  },
  'click .prop_feat-location': function(){
    var data = Session.get('profile_header');
    var location_id = data['city'] + "_" + data['state'];
    LocationRedirect(location_id);
  },
  'click .prop_feat-headerimage': function(){
    var data = Session.get('images_media');
    var listing_id = data["listing_key"];
    ListingRedirect(listing_id);
  },
})

Template.property_features.helpers({
  FeaturesList1: function(){

    var ReturnData = new Array();
    var data = Session.get("listing_breakdown");
    //var profile_data = Session.get("profile_header");
    if ( typeof data != "undefined" ) {
      var currentIndex = 0;
      ReturnData[currentIndex] = new Object();
      ReturnData[currentIndex]['Data'] = "LivingArea: " + NumberToCommaNumber(data.living_area) + " sq ft.";
      currentIndex++;
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

  FeaturesList2: function(){
    var ReturnData = new Array();
    var data = Session.get("listing_breakdown");
    //var profile_data = Session.get("profile_header");
    if ( typeof data != "undefined" ) {
      var currentIndex = 0;
      var FindObject = [{Name: "CoolingSystem", HTML: "Cooling: "},
        {Name: "HeatingSystem", HTML: "Heating: "},
        {Name: "RoofType", HTML: "Roofing: "},
        {Name: "appliance", HTML: "Appliances: "},
        {Name: "FloorCovering", HTML: "Flooring: "},
        {Name: "NumFloors", HTML: "Floors: "},
        {Name: "ParkingType", HTML: "Parking: "}
      ];

      var SecondData = GetFeatureData(FindObject, data, currentIndex);
      var ReturnData = ReturnData.concat(SecondData);
      return ReturnData;
    }
  },

  //SINGLE HELPERS
  address: function(){
    var data = Session.get("listing_breakdown");
    return data["street_address"];
  },
  location: function(){
    var data = Session.get("listing_breakdown");
    return data["city"] + ", " + data["state"];
  },
  listeddate: function(){
    var data = Session.get("listing_breakdown");
    return EpochToDate(data["listing_date_ut"]*1000);
  },
  lastupdated: function(){
    var data = Session.get("listing_breakdown");
    return EpochToDate(data["listing_date_edited_ut"]*1000);
  },
  price: function(){
    return "Price: $" + NumberToCommaNumber(Session.get("listing_breakdown")["list_price"]);
  },
  currenttolisted: function(){
    var data = Session.get("listing_breakdown");
    var currenttime = Math.round(new Date().getTime()/1000.0);
    listed = Math.round((currenttime - data["listing_date_ut"])/86400);
    return listed;
  },
  propertydesc: function(){
    var data = Session.get("listing_breakdown");
    if(data["listing_desc"] == null){
      return " - no description available";
    }
    return " - " + data["listing_desc"];
  },
  headerimage: function(){
    var image = Session.get("images_media");
    return image['photos'][0];
  },
  mainimage: function(){
    var counter = Session.get("property_features_index");
    var image = Session.get("images_media");
    return image['photos'][counter];
  },
  subimages: function(){
    var counter = Session.get("property_features_index");
    var customimage = Session.get("features_subimage");
    counterIndex(counter);
    return customimage;
  },
  status: function(){
    var data = Session.get("profile_header");
    if (typeof data == 'undefined'){
      return '';
    }
    return data['listing_status'];
  },
})

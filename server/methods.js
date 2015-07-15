Meteor.methods({
  GetProfileData: function(location_id) {
    console.log("New Location Request");
    var Start = new Date();
    Start = Start.getTime();

    if ( location_id.match(/^\d*$/) ) {
      var UrlString = "http://api.synapsys.us/listhuv/?action=location-profile&zip=" + location_id;
    } else {
      location_id = location_id.split('_');
      var UrlString = "http://api.synapsys.us/listhuv/?action=location-profile&city=" + location_id[0].toString().replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }) + "&state=" + location_id[1];
    }
    //var UrlString = "http://localhost:3000/ProfileData.json";
    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },
  GetListingData: function(listing_id) {
    console.log("New Listing Request");
    var Start = new Date();
    listing_id = listing_id || "3yd-SCKMLSKS-503900";

    console.log(listing_id);

    var UrlString = "http://api.synapsys.us/listhuv/?action=listing-profile&key=" + listing_id;
    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },
  ApplyFilters: function(value) {
    console.log(value);
  },
  GetPartnerHeader: function(partner_id) {
    console.log("Header call");
    if ( partner_id == 'tampa' ) {
      return "DemoTemplateHeader";
    } else {
      return "";
    }
  },
  GetListOfLists: function() {
    console.log("New List of List Request");
    var Start = new Date();
    Start = Start.getTime();
    var URLString = "http://api.synapsys.us/listhuv/?action=list_of_lists";
    var data = HTTP.call("GET",URLString);
    try {
      data = JSON.parse(data['content']);
    } catch (e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },
  GetListData: function(listname, state, city) {
    console.log("New List Request - " + listname);
    var Start = new Date();
    Start = Start.getTime();

    var URLString = "http://api.synapsys.us/listhuv/?action=" + listname;
    var ListLoc = "National";
    if ( typeof state != "undefined" && state != null ) {
      URLString = URLString + "&state=" + state;
      ListLoc = state;
    }
    if ( typeof city != "undefined" && city != null && typeof state != "undefined" && state != null ) {
      URLString = URLString + "&state=" + state;
      URLString = URLString + "&city=" + city;
      ListLoc = city + ", " + state;
    }

    var data = HTTP.call("GET",URLString);
    try {
      data = JSON.parse(data['content']);
    } catch (e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    var ReturnArray = new Object();
    ReturnArray['Data'] = data;
    return ReturnArray;
  },
  GetAbbrListData: function(listname, listIndex, city, state) {
    console.log("New Abbr List Request - " + listname);
    var Start = new Date();
    Start = Start.getTime();

    var URLString = "http://api.synapsys.us/listhuv/?action=" + listname;
    var ListLoc = "National";
    if ( typeof state != "undefined" && state != null ) {
      URLString = URLString + "&state=" + state;
      ListLoc = state;
    }
    if ( typeof city != "undefined" && city != null ) {
      URLString = URLString + "&city=" + city;
      ListLoc = city + ", " + state;
    }
    var data = HTTP.call("GET",URLString);
    try {
      data = JSON.parse(data['content']);
    } catch (e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }

    var NewData = new Array();
    for ( var index = 0; index < 6; index++ ) {
      if ( typeof data[index] != 'undefined' ) {
        NewData[index] = new Object();
        NewData[index]['listing_key'] = data[index]['listing_key'];
        NewData[index]['photo'] = data[index]['photo'];
      }
    }

    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    var ReturnArray = new Object();
    ReturnArray['Location'] = ListLoc;
    if ( typeof NewData[0]['photo'] == "undefined" ) {
      NewData = [];
    }
    ReturnArray['City'] = city;
    ReturnArray['State'] = state;
    ReturnArray['Data'] = NewData;
    ReturnArray['index'] = listIndex;
    return ReturnArray;
  },
  get_amenities: function(category,city,state,listing_id,skip) {
    console.log("New Amenities List Request");
    if ( (typeof city == "undefined" || city == null || typeof state == "undefined" || state == null) && (typeof listing_id == "undefined" || listing_id == null) ) {
      console.log("Bad Data");
      return "Bad Data";
    }
    if ( typeof skip == "undefined" || skip == null ) {
      delete skip;
    }
    if ( typeof category == "undefined" || category == null ) {
      delete category;
    }
    var Start = new Date();
    Start = Start.getTime();

    if ( typeof listing_id == "undefined" || listing_id == null ) {
      var URLString = "http://api.synapsys.us/listhuv/?action=amenities&state=" + state + "&city=" + city;
    } else {
      var URLString = "http://api.synapsys.us/listhuv/?action=amenities&key=" + listing_id;
    }

    if ( typeof category != "undefined" && category != null ) {
      URLString = URLString + "&cat=" + category;
    }
    if ( typeof skip != "undefined" && skip != null ) {
      URLString = URLString + "&skip=" + skip;
    }

    var data = HTTP.call("GET",URLString);
    try {
      data = JSON.parse(data['content']);
    } catch (e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }

    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");

    return data;
  },
  get_schools: function(category,city,state,listing_id,skip) {
    console.log("New Schools List Request");
    if ( (typeof city == "undefined" || city == null || typeof state == "undefined" || state == null) && (typeof listing_id == "undefined" || listing_id == null) ) {
      console.log("Bad Data");
      return "Bad Data";
    }
    if ( typeof skip == "undefined" || skip == null ) {
      delete skip;
    }
    if ( typeof category == "undefined" || category == null ) {
      delete category;
    }
    var Start = new Date();
    Start = Start.getTime();

    if ( typeof listing_id == "undefined" || listing_id == null ) {
      var URLString = "http://api.synapsys.us/listhuv/?action=nearby_schools&state=" + state + "&city=" + city;
    } else {
      var URLString = "http://api.synapsys.us/listhuv/?action=nearby_schools&key=" + listing_id;
    }

    if ( typeof category != "undefined" && category != null ) {
      URLString = URLString + "&gradelevel=" + category;
    }
    if ( typeof skip != "undefined" && skip != null ) {
      URLString = URLString + "&skip=" + skip;
    }

    var data = HTTP.call("GET",URLString);
    try {
      data = JSON.parse(data['content']);
    } catch (e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }

    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");

    return data;
  },
  get_nearby_city: function(ip_address) {
    if ( typeof ip_address == "undefined" ) {
      return "";
    }
    var URLString = "http://api.synapsys.us/zipcode/?action=ipToLoc&ip=" + ip_address + "&range=";
    var distance = 5;
    do {
      var data = HTTP.call("GET",URLString + distance);
      try {
        data = JSON.parse(data['content']);
      } catch (e) {
        console.log("Exception");
        data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
        data = JSON.parse(data['content']);
      }

      var ReturnArray = [];
      var counter = 0;
      for ( var label in data ) {
        counter++;
        if ( label == "status" ) {
          return "";
        }
        if ( ReturnArray.length < 5 ) {
          var split = label.split(",");
          ReturnArray[ReturnArray.length] = {
            city: split[0].trim(),
            state: split[1].trim()
          };
        }
      }
      distance += distance;
      if ( distance > 1000 ) {
        return "";
      }
    } while(ReturnArray.length < 5);
    return {
      data: ReturnArray,
      distance: distance
    };
  }
});

Meteor.startup(function(){
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /');
});

function ExecSearch() {
  var LocationText = $('.re_mainsearch input')[0].value;
  if ( LocationText.match(/^\d*$/) ) {
    location_id = LocationText;
  } else if ( LocationText.match(/^[^\,]*\,[^\,]*$/) ) {
    LocationText = LocationText.split(',');
    LocationText[0] = LocationText[0].trim();
    LocationText[1] = LocationText[1].trim();
    LocationText[0] = LocationText[0].replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
    LocationText[1] = LocationText[1].toUpperCase();
    if ( LocationText[1].length != 2 ) {
      console.log("Incorrect state length");
      return;
    }
    var location_id = LocationText[0] + "_" + LocationText[1];
  } else {
    console.log('Other');
    return;
  }
  LocationRedirect(location_id);
  $('.re_mainsearch input')[0].value = "";
}

Template.realestate_homepage.events({
  'keypress .re_mainsearch input': function(event){
    if ( event.which === 13 ) {
      ExecSearch();
    }
  },
  'click .re_searchbtn.fa-search': function() {
    ExecSearch();
  }
});

Template.realestate_homepage.onCreated(function() {
  //use third part api to grab your global ip to be used in a data call
  $.get("http://ipinfo.io", function (response) {
    postalCode = response['postal'];
    $.get("http://api.synapsys.us/zipcode/?action=zipToCity&zip=" + response['postal'], function(response) {
      Session.set('HomePageLocation', response[postalCode][0]);
    }, "json");

    Meteor.call('get_nearby_city',response['ip'],function(error,response) {
      if ( error ) {
        console.log("ERROR",error);
        return "";
      }
      if ( response == "" ) {
        return "";
      }
      Session.set("CityInfo",response);
      $(".re_explore").css("display","block");
    });
  }, "jsonp");
});

Template.realestate_homepage.onRendered(function(){
  $("#feature1").css({"background-image":"URL(/Image_Interactive_Map.png)","float":"left"});
  $("#feature2").css({"background-color":"#000000","float":"left"});
  $("#feature3").css({"background-image":"URL(/Image_Trending_News.png)","float":"right"});
  $("#feature4").css({"background-image":"URL(/Image_Top_100_List.png)","float":"right"});

  $(".re_explore-green").css({"background-image":"URL(/Icons_Explore.png)"});
  $(".re_features_note-green").css({"background-image":"URL(/Icons_Features.png)"});
});

Template.realestate_homepage.helpers({
  TopHomesURL: function() {
    var data = Session.get("HomePageLocation");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return Router.path('content.realestate.listview',{
      partner_id: Session.get("partner_id"),
      list_name: "most_expensive_homes",
      state_id: data['state'],
      city_id: data['city']
    });
  },
  Cities: function() {
    var data = Session.get("CityInfo");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var guide = [
      {class: "re_explore-image1",id: "explore1", index: 0},
      {class: "re_explore-image2",id: "explore2", index: 1},
      {class: "re_explore-image2",id: "explore3", isString: true},
      {class: "re_explore-image1",id: "explore4", index: 2},
      {class: "re_explore-image1",id: "explore5", index: 3},
      {class: "re_explore-image2",id: "explore6", index: 4}
    ];
    var ReturnArray = [];
    for ( var index = 0; index < guide.length; index++ ) {
      ReturnArray[index] = guide[index];
      if ( guide[index].isString ) {
        ReturnArray[index]['String'] = "Here are 5 cities within " + data['distance'] + " miles of your location";
      } else {
        var localInd = guide[index]['index'];
        ReturnArray[index]['String'] = data['data'][localInd]['city'] + ", " + data['data'][localInd]['state'];
        ReturnArray[index]['URL'] = Router.path('content.realestate.location',{
          location_id: data['data'][localInd]['city'] + "_" + data['data'][localInd]['state']
        });
      }
    }
    return ReturnArray;
  },
  CityName: function() {
    var data = Session.get("HomePageLocation");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return StringToSentence(data['city']);
  },
  Top100URL: function() {
    var data = Session.get("HomePageLocation");
    if ( typeof data == "undefined" ) {
      return Router.path('content.realestate.listoflists',{
        partner_id: Session.get("partner_id")
      });
    }
    return Router.path('content.realestate.listoflists',{
      partner_id: Session.get("partner_id"),
      state_id: data['state'],
      city_id: data['city']
    });
  }
});

/* Author: Ryan Fisher
** Created: 06/26/2015
** Description: .js file for Search Results List View
** Associated Files: re_list_view.less,re_list_view.html,re_list_view_logic.js
*/

Template.re_list_view.onCreated(function(){
  Session.set("ListViewCounter",0);
});

Template.re_list_view.helpers({
  ListDescription: function(){
    return StringToSentence(Session.get("ListName").replace(/\_/g," ")) + " in " + Session.get("ListLocation");
  },
  ListLength: function() {
    var data = Session.get("ListViewData");
    if ( typeof data != "undefined" ) {
      return data.length;
    }
  },
  FeaturedPic: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return data[counter]['photo'];
    }
  },
  FeaturedPrice: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return NumberToCommaNumber(data[counter]['list_price']);
    }
  },
  FeaturedSqft: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return NumberToCommaNumber(data[counter]['living_area']);
    }
  },
  FeaturedURL: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return ListingURL(data[counter]['listing_key']);
    }
  },
  FeaturedAddress: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return data[counter]['street_address'];
    }
  },
  FeaturedCity: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return data[counter]['city'];
    }
  },
  FeaturedState: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return data[counter]['state'];
    }
  },
  FeaturedZip: function() {
    var data = Session.get("ListViewData");
    var counter = Session.get("ListViewCounter");
    if ( typeof data != "undefined" ) {
      return data[counter]['zipcode'];
    }
  },
  ListLocation: function() {
    return Session.get("ListLocation");
  },
  ListItem: function(){
    var data = Session.get("ListViewData");
    if ( typeof data == "undefined" ) {
      return [];
    }
    var ReturnArray = new Array();
    for ( var localIndex = 0; localIndex < data.length; localIndex++ ) {
      var LocalData = new Object();
      LocalData['ItemCity'] = data[localIndex]['city'];
      LocalData['ItemState'] = data[localIndex]['state'];
      if ( typeof data[localIndex]['neighborhood'] != "undefined" && data[localIndex]['neighborhood'] != null ) {
        LocalData['ItemNeighborhood'] = data[localIndex]['neighborhood'];
      }
      LocalData['ItemYear'] = data[localIndex]['year_built'];
      LocalData['ItemAddress'] = data[localIndex]['street_address'];
      LocalData['ItemPrice'] = NumberToCommaNumber(data[localIndex]['list_price']);
      LocalData['ItemBeds'] = data[localIndex]['features']['rooms']['Bedroom'];
      LocalData['ItemBaths'] = data[localIndex]['features']['rooms']['Full Bath'];
      LocalData['ItemSqft'] = NumberToCommaNumber(data[localIndex]['living_area']);
      LocalData['ItemKey'] = data[localIndex]['listing_key'];
      LocalData['ItemPhoto'] = data[localIndex]['photo'];
      LocalData['ItemURL'] = ListingURL(data[localIndex]['listing_key']);
      LocalData['ItemNum'] = localIndex + 1;
      LocalData['ItemRealtorPhoto'] = data[localIndex]['realtor_logo'];
      if ( localIndex%2 == 0 ) {
        LocalData['ItemClass'] = "result_odd_class";
      } else {
        LocalData['ItemClass'] = "result_even_class";
      }
      ReturnArray[localIndex] = LocalData;
    }
    return ReturnArray;
  }
});

Template.re_list_view.events({
  'click .list-view_module_featured_left-button': function() {
    var index = Session.get("ListViewCounter");
    var data = Session.get("ListViewData");
    if ( typeof data == "undefined" ) {
      return "";
    }
    if ( index == 0 ) {
      index = data.length;
    }
    index--;
    Session.set("ListViewCounter",index);
  },
  'click .list-view_module_featured_right-button': function() {
    var index = Session.get("ListViewCounter");
    var data = Session.get("ListViewData");
    if ( typeof data == "undefined" ) {
      return "";
    }
    index++;
    if ( index == data.length ) {
      index = 0;
    }
    Session.set("ListViewCounter",index);
  },
  'click .list-view_module_featured_button': function() {
    var index = Session.get("ListViewCounter");
    var data = Session.get("ListViewData");
    if ( typeof data == "undefined" ) {
      return "";
    }
    ListingRedirect(data[index]['listing_key']);
  },
  'click .list-view_result_button': function(event){
    var data = Session.get("ListViewData");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var ClickedElem = event.target;
    if ( !$(event.target).hasClass('list-view_result_button') ) {
      ClickedElem = $(event.target)[0].parentElement;
    }
    ListingRedirect($(ClickedElem)[0].id);
  }
})

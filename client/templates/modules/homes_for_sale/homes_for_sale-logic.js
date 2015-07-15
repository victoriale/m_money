function EpochToDate(EpochSec) {
  var d = new Date(EpochSec);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();
  return month + "/" + day + "/" + year;
}

Template.homes_for_sale.helpers({
  ModuleLocation: function() {
    var data = Session.get('profile_header');
    if ( typeof data != "undefined" ) {
      return data['city'] + ", " + data['state'];
    }
  },
  ListingList: function() {
    var data = Session.get("homes_for_sale");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var ReturnData = new Array();
    for ( var index = 0; index < data.length; index++ ) {
      var LocalData = new Object();
      var ListData = data[index];
      if ( index%2 == 0 ) {
        LocalData['Class'] = "homesforsale_even";
      } else {
        LocalData['Class'] = "homesforsale_odd";
      }
      LocalData['ImageURL'] = ListData['photos'][0];
      LocalData['Number'] = index + 1;
      LocalData['Location'] = ListData['city'] + ", " + ListData['state'];
      LocalData['Neighborhood'] = ListData['neighborhood'];
      LocalData['DaysOnMarket'] = DaysSinceDate(ListData['listing_date_ut']);
      LocalData['Views'] = ListData['views'];
      LocalData['Address'] = ListData['street_address'];
      LocalData['ListPrice'] = NumberToCommaNumber(ListData['list_price']);
      LocalData['ListURL'] = ListingURL(ListData['listing_key']);
      LocalData['ListingID'] = ListData['listing_key'];
      LocalData['TimeSinceChange'] = EpochToDate(ListData['listing_date_ut'] * 1000);
      ReturnData[index] = LocalData;
    }
    return ReturnData;
  },
  WholeListURL: function() {
    var data = Session.get('profile_header');
    if ( typeof data == "undefined" ) {
      return "";
    }
    return "/listview/most_recent_listings/" + data['state'] + "/" + data['city'];
  }
});

Template.homes_for_sale.events({
  'click .homesforsale_image, click .homesforsale_viewprofile': function() {
    ListingRedirect(this['ListingID']);
  },
  'click #homesforsale_wholelist': function() {
    var data = Session.get('profile_header');
    if ( typeof data == "undefined" ) {
      return "";
    }
    Router.go("content.realestate.listview",{
      list_name: "most_recent_listings",
      state_id: data['state'],
      city_id: data['city'],
      partner_id: Session.get('partner_id')
    });
  }
});

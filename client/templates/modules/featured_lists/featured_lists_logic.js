//on render display the first available listing
Template.featured_lists.onCreated(function(){
  Session.set("featured_list_index", 0);
});

Template.featured_lists.onRendered(function(){
  var data = Session.get("featured_list");
  $(".center-image").css("background-image","url('" + data[0].photo + "')");
});

//set click event to change the the top featured list and display new image
Template.featured_lists.events({
  'click .nav-right': function() {
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    if(featured_list_index < data.length - 1){
      featured_list_index++;
    } else {
      featured_list_index = 0;
    }
    Session.set("featured_list_index", featured_list_index);
    //$(".center-image").css("background-image","url('" + data[featured_list_index].photo + "')");
  },
  'click .nav-left': function() {
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    if(featured_list_index > 0){
      featured_list_index--;
    } else {
      featured_list_index = data.length - 1;
    }
    Session.set("featured_list_index", featured_list_index);
    //$(".center-image").css("background-image","url('"+ data[featured_list_index].photo +"')");
  },
  'click #featured_list_link': function(){
    if ( Session.get("isListing") != true ) {
      var featured_list_index = Session.get("featured_list_index");
      var data = Session.get("featured_list");
      ListingRedirect(data[featured_list_index]['listing_key']);
    }
  },
  'click #FeaturedListButton': function() {
    var data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    ListViewRedirect("most_expensive_homes",data['state'],data['city']);
  },
  'click #Top10List': function() {
    var data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    ResetSession();
    Router.go("content.realestate.listoflists",{
      list_limit: 10,
      list_name: "most_expensive_homes",
      state_id: data['state'],
      city_id: data['city'],
      partner_id: Session.get("partner_id")
    })
  }
})

Template.featured_lists.helpers({
  FullStreetAddress: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index].street_address;
  },
  City: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index].city;
  },
  State: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index].state;
  },
  PostalCode: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index].zipcode;
  },
  CountyName: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index].neighborhood;
  },
  Bedrooms: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return data[featured_list_index]['features']['rooms']['Bedroom'];
  },
  BathRooms: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    var baths = data[featured_list_index]['features']['rooms']['Full Bath'];
    if ( typeof data[featured_list_index]['features']['rooms']['Half Bath'] != 'undefined' ) {
      baths = baths + " (+" + data[featured_list_index]['features']['rooms']['Half Bath'] + " half)";
    }
    return baths;
  },
  featured_list_index: function(){
    var featured_list_index = Session.get("featured_list_index");
    return ("#")+(featured_list_index+1);
  },
  Price: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    return NumberToCommaNumber(data[featured_list_index].list_price);
  },
  ListingPhoto: function(){
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    if ( typeof data != 'undefined' ) {
      return data[featured_list_index].photo;
    }
  },
  ListingURL: function() {
    var data = Session.get("featured_list");
    var featured_list_index = Session.get("featured_list_index");
    if ( typeof data != 'undefined' ) {
      return ListingURL(data[featured_list_index]['listing_key']);
    }
  },
  ListURL: function() {
    var data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return "/listview/most_expensive_homes/" + data['state'] + "/" + data['city'];
  },
  SimilarTopListsURL: function(){
    var data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return "/list_of_lists/" + data['state'] + "/" + data['city'];
  },
  Top10ListURL: function() {
    var data = Session.get("profile_header");
    if ( typeof data == "undefined" ) {
      return "";
    }
    return "/list_of_lists10/" + data['state'] + "/" + data['city'];
  }
})

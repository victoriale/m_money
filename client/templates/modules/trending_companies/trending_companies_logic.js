//set initial counter for start of trending companies

//on render display the first available listing
Template.trending_companies.onCreated(function(){
  Session.set("company_counter", 0);
})

Template.trending_companies.events({
  'click .companies_all-myframe_right_button': function() {
    var data = Session.get("trending_companies");
    var counter = Session.get("company_counter");
    if(counter < data.length - 1){
      counter++;
      Session.set("company_counter", counter);
      $(".companies_all-myframe_circle1").css("background-image","url('"+ data[counter].company_logo +"')");
    }

  },
  'click .companies_all-myframe_left_button': function() {
    var data = Session.get("trending_companies");
    var counter = Session.get("company_counter");
    if(counter > 0){
      counter--;
      Session.set("company_counter", counter);
      $(".companies_all-myframe_circle1").css("background-image","url('"+ data[counter].company_logo +"')");
    }
  }
})

Template.trending_companies.helpers({
  SmallImgURL: function() {
    var data = Session.get("trending_companies");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var counter = Session.get("company_counter");
    return data[counter]['company_logo'];
  },
  location: function(){
    if(Session.get("isListing")){
      var  data = Session.get("profile_header");
      if ( typeof data != "undefined" ) {
        return ("near ")+data.street_address;
      }
    } else {
      var  data = Session.get("profile_header");
      if ( typeof data != "undefined" ) {
        return data.city + (", ") + data.state;
      }
    }
  },
  company_name: function(){
    var data = Session.get("trending_companies");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var counter = Session.get("company_counter");
    return data[counter]['company_name'];
  },
  price: function(){
    var data = Session.get("trending_companies");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var counter = Session.get("company_counter");
    return data[counter].total_market_cap;
  },
  image: function(){
    var data = Session.get("trending_companies");
    if ( typeof data == "undefined" ) {
      return "";
    }
    var counter = Session.get("company_counter");
    $(".companies_all-myframe_circle1").css("background-image","url('"+ data[counter].company_logo +"')");
  },
})

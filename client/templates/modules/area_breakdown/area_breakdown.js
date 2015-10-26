/*
Author : David Wibowo
Date: 09/08/2015
Description: Area brekdown
Associated files: area_breakdown.html,area_breakdown.less,area_breakdown.js
*/
var full_page = false;
Template.area_breakdown.helpers({
  statistics:function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return false;
    }
    var statistics = [
      {money:data.total_market_cap, desci:"Total Public Market Cap", fa:"fa-globe"},
      {money:data.total_companies,desci:"Total Companies",fa:"fa-building-o"},
      {money:data.total_executives,desci:"Total Executives",fa:"fa-user"}
    ];
    return statistics;
  },

  location: function(){
    var loc = Session.get('loc_id');
    if(typeof loc == 'undefined'){
      return false;
    }
    return loc;
  },

  statURL: function(){
    var loc = Session.get('loc_id');
    if(typeof loc == 'undefined'){
      return false;
    }
    return Router.path('content.statistics',{loc_id:loc});
  },
});

Template.area_breakdown.onRendered(function(){
  this.autorun(function(){
     // Map
     map = new google.maps.Map(document.getElementById('loc_map'), {
       zoom: 11,
       center: {lat: 37.7833, lng: -122.4167},  // Latitude and longtitude in decimal form
       scrollwheel: false
     });

     // Enable full page or short view
     if (full_page == true) {
       $(".ftr").css("display","none");
       $(".bkdn").css({"height":"auto", "overflow":"visible"});
     } else {
       $(".ftr").css("display","block");
       $(".bkdn").css({"height":"660px", "overflow":"hidden"});
     }
  });
})

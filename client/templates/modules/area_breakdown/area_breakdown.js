/*
Author : David Wibowo
Date: 09/08/2015
Description: Area brekdown
Associated files: area_breakdown.html,area_breakdown.less,area_breakdown.js
*/
var full_page = false;
Template.area_breakdown.helpers({
   City:"San Francisco",
   State:"CA",
   LastUpdate:"Today at 8:00AM EST",
   items:[
     {money:"4 Trillion", desci:"Total Public Market Cap", fa:"fa-users", url:"#"},
     {money:"$7 Billion",desci:"Total Executive Compensation",fa:"fa-globe", url:"#"},
     {money:"$537,500",desci:"Average Executive Compensation",fa:"fa-user", url:"#"},
     {money:"44.53 Million",desci:"Total Shares",fa:"fa-building-o", url:"#"}
   ]
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

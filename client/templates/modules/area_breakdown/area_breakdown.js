/*
Author : David Wibowo
Date: 09/08/2015
Description: Area brekdown
Associated files: area_breakdown.html,area_breakdown.less,area_breakdown.js
*/
var full_page = false;
Template.area_breakdown.helpers({
  dataExists:function(){
    var data = Session.get('breakdown');

    return typeof data === 'undefined' ? false : true;
  },
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
    var loc = Session.get('profile_header').location;
    if(typeof loc == 'undefined'){
      return false;
    }
    return loc;
  },

  statURL: function(){
    var loc = Session.get('profile_header').location;
    var params = Router.current().getParams();
    if(typeof loc == 'undefined'){
      return false;
    }
    return Router.pick_path('content.statistics',{loc_id:params.loc_id});
  },
});

Template.breakdown_map.onRendered(function(){

  this.autorun(function(){
    var data = Session.get('breakdown');

    if(typeof data === 'undefined'){
      return '';
    }

    var results = {
      best: 2000
    };
    for ( var o = 0; o < data.length; o++ ) {
      var xdiff = 0;
      var ydiff = 0;
      var x = parseFloat(data[o].c_latitude);
      var y = parseFloat(data[o].c_longitude);
      for ( var s = 0; s < data.length; s++ ) {
        xdiff = xdiff + Math.abs(x - parseFloat(data[s].c_latitude));
        ydiff = ydiff + Math.abs(y - parseFloat(data[s].c_longitude));
      }

      xdiff = xdiff / data.length;
      ydiff = ydiff / data.length;


      if ( (ydiff + xdiff) < results.best ) {
        results.best = ydiff + xdiff;
        results.index = o;
      }

      data[o].xdiff = xdiff;
      data[o].ydiff = ydiff;
    }
    var center = data[results.index];

     // Map
     var mapOptions = {
       zoom: 10,
       center: new google.maps.LatLng(center.c_latitude, center.c_longitude),
       mapTypeId: google.maps.MapTypeId.HYBRID
     };

     mainmap = new google.maps.Map(
       document.getElementById('loc_map'),
       mapOptions
     );

     for(var i = 0; i < data.length; i++){
       var URL = Router.pick_path('content.companyprofile',{
         ticker:data[i]['c_ticker'],
         name:compUrlName(data[i]['c_name']),
         company_id:data[i]['c_id'],
       })
       var content = "<a href='"+URL+"'>" + data[i]['c_name'] + "</a>";
       var marker = new google.maps.Marker({
         position: {lat:Number(data[i].c_latitude), lng:Number(data[i].c_longitude)},
         map: mainmap,
         icon: '/public/mapmarker.png'
       });

       var infowindow = new google.maps.InfoWindow();
       google.maps.event.addListener(marker, 'click',
       (function(marker, content, infowindow) {
         return function(){
           infowindow.setContent(content);
           infowindow.open(mainmap, marker);
         };
      })(marker, content, infowindow));
     }

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

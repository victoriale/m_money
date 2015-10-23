/*Author: Zachary Pearson
**** Created: 10/01/2015
**** Description: about_company
**** Associated Files: about_company.html, about_company.less, about_company_logic.js
*/
Template.about_company.helpers({
  aboutURL: function(){
    var params = Router.current().getParams();
    //console.log(params);
    if(typeof params == 'undefined'){
      return '#';
    }
    return Router.path('content.abouthq',{
      comp_id: params.company_id,
    });
  },
  company: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },

  text: function(){
    var data = Session.get('bio_location');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_desc;
  },
})

Template.about_company.onRendered(function(){
  Tracker.autorun(function(){
    MapInit();
  })
})

MapInit = function() {
  var map = Session.get('bio_location');
  if(typeof map == 'undefined'){
    return '';
  }
  var lat = Number(map.c_latitude);
  var long = Number(map.c_longitude);
  //Map options
  var mapOptions = {
    zoom: 19,
    center: new google.maps.LatLng(lat, long),
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
  var marker = new google.maps.Marker({
  position: {lat:lat, lng:long},
  map: mainmap,
  icon: '/mapmarker.png'
});
}

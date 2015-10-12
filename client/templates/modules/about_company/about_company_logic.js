/*Author: Zachary Pearson
**** Created: 10/01/2015
**** Description: about_company
**** Associated Files: about_company.html, about_company.less, about_company_logic.js
*/
Template.about_company.helpers({
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
  //Map options
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(37.33177, -122.03042),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
  var marker = new google.maps.Marker({
  position: {lat:37.33177, lng:-122.03042},
  map: mainmap,
  icon: '/mapmarker.png'
});
}

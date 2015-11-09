/* Author: Ryan Fisher
** Created: 10/06/2015
** Description: .js file for Office Location Page
** Associated Files: c_hq_page.html, c_hq_page.less, c_hq_page_logic.js
*/

Template.c_hq_page.helpers({
  dataHQ: function(){
    var data = Session.get('bio_location');
    var company = Session.get('profile_header');
    if(typeof data == 'undefined' || typeof company == 'undefined'){
      return '';
    }

    var category = [
      {
        title: 'Address',
        line:[
          {text: company.c_name, isLink: false},
          {text: company.c_sector, isLink: false},
          {text: data.c_hq_city + ", "+ data.c_hq_state + " " + data.c_zip, isLink: false}
        ]
      },
      {
        title: 'Description:',
        line:[
          {text: data.c_desc, isLink: false}
        ]
      },
      {
        title: 'Company URL',
        line:[
          {text: data.c_url, isLink: true}
        ]
      },
      /*{
        title: 'InvestKit ID',
        line:[
          {text: Router.pick_path('content.companyprofile', {company_id: company.c_id}), isLink: true}
        ]
      },*/
    ];

    return category;
  },

  compInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['url'] = Router.pick_path('content.companyprofile',{
      name: compUrlName(data.c_name),
      ticker: data.c_ticker,
      company_id: data.c_id
    });
    return data;
  },

  compImage: function(){
    var image = Session.get('profile_header');
    if(typeof image == 'undefined'){
      return '';
    }
    return image.c_logo;
  },
});

Template.c_hq_page.onRendered(function(){
  Tracker.autorun(function(){
    initializeHQMap();
  })
});

//Global Function to initialize the map
initializeHQMap = function() {
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
    icon: '/public/mapmarker.png'
  });
}

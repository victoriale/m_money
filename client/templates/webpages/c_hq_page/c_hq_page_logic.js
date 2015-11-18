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
          {text: data.c_street_addr + " "},
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

    data['thisUrl'] = Router.pick_path('content.abouthq', {
      name: compUrlName(data.c_name),
      ticker: data.c_ticker,
      company_id: data.c_id
    })

    //Build location string
    if(data.c_hq_city !== '' && data.c_hq_state !== ''){
      data.location = toTitleCase(data.c_hq_city) + ', ' + data.c_hq_state;
    }else if(data.c_hq_city === '' && data.c_hq_state !== ''){
      data.location = data.c_hq_state;
    }else if(data.c_hq_city !== '' && data.c_hq_state === ''){
      data.location = toTitleCase(data.c_hq_city);
    }else{
      data.location = '';
    }

    data.c_tr_last_updated = (new Date(data.c_tr_last_updated)).toSNTForm();

    data.locurl = Router.pick_path('content.locationprofile',{
      loc_id:data.c_hq_state,
      city:data.c_hq_city,
    })

    data.shareUrl= "https://www.facebook.com/sharer/sharer.php?u=" + data.thisUrl;
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

  //Backup if geocodes are innacurate
  /*this.autorun(function(){
    initializeHQMap_address();
  })*/

  Tracker.autorun(function(){
    initializeHQMap();
  })
});

//This is a backup plan for maps. If database geocodes are innacurate use this. This directly gives google maps the address to get lng and lat, then plugs it back into google maps to get map with marker
initializeHQMap_address = function(){
  var bio_location = Session.get('bio_location');
  if(typeof bio_location === 'undefined'){
    return false;
  }

  Meteor.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + bio_location.c_street_addr + ',' + bio_location.c_hq_city + ',' + bio_location.c_hq_state, function(err, result){

    var lat = result.data.results[0].geometry.location.lat;
    var lng = result.data.results[0].geometry.location.lng;

    //Map options
    var mapOptions = {
      zoom: 19,
      center: new google.maps.LatLng(lat, lng),
      mapTypeId: google.maps.MapTypeId.HYBRID
    };
    mainmap = new google.maps.Map(
      document.getElementById('mainmap'),
      mapOptions
    );
    var marker = new google.maps.Marker({
      position: {lat:lat, lng:lng},
      map: mainmap,
      icon: '/public/mapmarker.png',
    });
  })
}

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
    icon: '/public/mapmarker.png',
  });
}

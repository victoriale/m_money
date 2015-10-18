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
    data['url'] = Router.path('content.companyprofile',{
      company_id: data.c_id
    });

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
        title: 'InvestKit ID',
        line:[
          {text: Router.path('content.companyprofile', {company_id: company.c_id}), isLink: true}
        ]
      },
    ];

    return category;
  },

  compInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    data['url'] = Router.path('content.companyprofile',{
      company_id: data.c_id
    });
    return data;
  },

});

Template.c_hq_page.onRendered(function(){
  Tracker.autorun(function(){
    initializeHQMap();
  })
});

//Global Function to initialize the map
initializeHQMap = function() {
  //Map options
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(37.33072, -122.029674),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
}

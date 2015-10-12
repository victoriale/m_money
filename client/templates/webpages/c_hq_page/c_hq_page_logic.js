/* Author: Ryan Fisher
** Created: 10/06/2015
** Description: .js file for Office Location Page
** Associated Files: c_hq_page.html, c_hq_page.less, c_hq_page_logic.js
*/

Template.c_hq_page.helpers({
  company: 'Apple, Inc.',
  BackTxt: "[Profile]'s",

  category:[
    {
      title: 'Address',
      line:[
        {text: 'Apple, Inc.', isLink: false},
        {text: 'Infinite Loop', isLink: false},
        {text: 'Cupertino, CA 95014', isLink: false}
      ]
    },
    {
      title: 'Phone',
      line:[
        {text: '(408) 996-1010', isLink: false}
      ]
    },
    {
      title: 'InvestKit ID',
      line:[
        {text: 'passfail.com/nasdaq/apple-inc-aapl/apple-inc-aapl.htm', isLink: true}
      ]
    },
    {
      title: 'Official Website',
      line:[
        {text: 'www.apple.com', isLink: true}
      ]
    }
  ]
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

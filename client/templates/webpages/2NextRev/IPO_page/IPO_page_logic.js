/* Author: Ryan Fisher
** Created: 08/14/2015
** Description: .js file for IPO Page - Office Location
** Associated Files: IPO_page.html, IPO_page.less, IPO_page_logic.js
*/

Template.IPO_page.helpers({
  company: "Facebook, Inc.",
  location: "San Francisco, CA",

  data:[
    {
      title: 'Address',
      line:[
        {text: 'Apple, Inc', isLink: false},
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
        {text: 'passfail.com/nasdaq/apple-inc-aapl/aapl.htm', isLink: true}
      ]
    },
    {
      title: 'Official Website',
      line:[
        {text: 'www.apple.com', isLink: true}
      ]
    }
  ]
})

Template.IPO_page.onRendered(function(){
  Tracker.autorun(function(){
    initializeIPOPageMap();
  })
})

//Global Function to initialize the map
initializeIPOPageMap = function() {
  //Map options
  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(37.331696, -122.030744),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
}

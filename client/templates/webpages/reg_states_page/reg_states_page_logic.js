/* Author: Ryan Fisher
** Created: 08/04/2015
** Description: .js file for Registered States Page
** Associated Files: reg_states_page.html, reg_states_page.less, reg_states_page_logic.js
*/

Template.reg_states_page.helpers({
  data:[
    {bgc: '#f2f2f2', state: 'California', advisors: '52,000', startdate: '07/01/2015', update: '07/30/2015'},
    {bgc: '#ffffff', state: 'Ohio', advisors: '37,000', startdate: '09/01/2002', update: '07/30/2015'},
    {bgc: '#f2f2f2', state: 'Tennessee', advisors: '18,000', startdate: '10/01/1996', update: '07/30/2015'}
  ],

  advisor:[
    {name: 'Molly Carapiet', states: 15},
    {name: 'Michael Ta Vo', states: 32},
    {name: 'Greg Walker', states: 22},
    {name: 'Paul Herman', states: 10}
  ]
})

Template.reg_states_page.onRendered(function(){
  Tracker.autorun(function(){
    initializeMap();
  })
})

//Global Function to initialize the map
initializeMap = function() {
  //Map options
  var mapOptions = {
    zoom: 4,
    center: new google.maps.LatLng(40, -97),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  mainmap = new google.maps.Map(
    document.getElementById('mainmap'),
    mapOptions
  );
}

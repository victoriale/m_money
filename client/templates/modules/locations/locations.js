/*
Author: Meghana yerramilli
Created: [8-12-2015]
Description:locations
Associated Files: locations.html,locations.less
*/
//data set
details = [
  {
    location:"Sacremento, CA",
    fig:"33",
  },
];
//function for restrieval of data
Template.locations.helpers({

  location: function(){
    return details[0].location;
  },
  fig: function(){
    return details[0].fig;
  },

})

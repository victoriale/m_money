/*
Author: Meghana yerramilli
Created: [8-12-2015]
Description:connections
Associated Files: connections.html,connections.less
*/
//data set
det = [
  {
    ceo:"MARK ZUCKERBERG",
    location:"San Fransisco,CA",
    cmperson:"Sandy Sandeberg",
    postion:"COO",
    company:"Facebook, Inc"
  },
];
//function for restrieval of data
Template.connections.helpers({
  ceo: function(){
    return det[0].ceo;
  },
  location: function(){
    return det[0].location;
  },
  cmperson: function(){
    return det[0].cmperson;
  },
  postion: function(){
    return det[0].postion;
  },
  company: function(){
    return det[0].company;
  },
})

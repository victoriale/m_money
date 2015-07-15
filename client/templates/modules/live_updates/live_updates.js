/*Author: [Naveen]
Created: [6/15/2015]
Last Modified:[6/26/2015]
Description: [ This file includes js script for module live-updates along with comments (File name: lives_updates.less)]
Associated Files: [The modules.less, live_updates.html for the module]*/
Template.live_updates.onRendered(function(){
  Meteor.call('GetProfileData',function(error,result){
    if(!error){
      Session.set("live_updates",result);
    }
    else{
      console.log("ERROR");
    };
  })
});

Template.live_updates.helpers({

   Bedroom: function()
   { //This function calls the  data for number of Bedrooms
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0].Bedrooms;
  },

  Bathroom: function()
  {//This function calls the  data for number of Bathrooms
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0].Bathrooms;
  },
  FullStreetAddress: function()
  {//This function calls the  data for Full Street-Address
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0]['Address'].FullStreetAddress;
  },
  ListPrice: function(){
    //This function calls the data for list price
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0].ListPrice;
  },
  Back_image: function(){
    //This function calls the  data for URL
    var data = Session.get("live_updates");
    return data['residential']['items'][0]['Photos']['Photo'][0].MediaURL;
  },
  city: function(){
    //This function calls the  data for city
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0]['Address'].City;
  },
  state: function(){
  //This function calls the  data for state or province
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][0]['Address'].StateOrProvince;
  },
  Bedroom1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1].Bedrooms;
  },

  Bathroom1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1].Bathrooms;
  },
  FullStreetAddress1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1]['Address'].FullStreetAddress;
  },
  ListPrice1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1].ListPrice;
  },
  Back_image1: function(){
  var data = Session.get("live_updates");
  return data['residential']['items'][1]['Photos']['Photo'][1].MediaURL;
  },
  city1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1]['Address'].City;
  },
  state1: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][1]['Address'].StateOrProvince;
  },
  Bedroom2: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][2].Bedrooms;
  },
  Bathroom2: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][2].Bathrooms;
  },
  FullStreetAddress2: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][2]['Address'].FullStreetAddress;
  },
  ListPrice2: function(){
  var data = Session.get("live_updates");
  console.log("Calling-Amenities",data);
  return data['residential']['items'][2].ListPrice;
  },
  Back_image2: function(){
  var data = Session.get("live_updates");
  return data['residential']['items'][2]['Photos']['Photo'][2].MediaURL;
  },

   Time_stamp: function(){
     var data = Session.get("live_updates");
     var data = new Date();
     return data['residential']['items'][0].ListingDate
   },
   link0: function()
   {//This function provides the URL an image refers to ,when an image is clicked
   var data = Session.get("live_updates");
   return data['residential']['items'][0].ListingURL;
   },
   link1: function(){
   var data = Session.get("live_updates");
   return data['residential']['items'][1].ListingURL;
   },
   link2: function(){
   var data = Session.get("live_updates");
   return data['residential']['items'][2].ListingURL;
   }
  })

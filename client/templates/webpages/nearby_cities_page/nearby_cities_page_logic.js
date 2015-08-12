/*
Author: jyothyswaroop
Created: 8/12/2015
Description: nearby_cities_page
Associated Files: nearby_cities_page.less and nearby_cities_page.html
*/
var counter=0;

//renders the data when page loads
Template.nearby_cities_page.onRendered(function () {
$(".nerby_pg-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.nearby_cities_page.helpers({
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "San Francisco";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "Nearby Cities";
      return name1;
    },
//gave names for dyamic access {{getheadername}}
    noofcities: function(){
      var noof= "182";
      return noof;
    },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Mountain View, CA";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "880 Billion";
    return name2;
  },
  //gave names for dyamic access {{getheadername2}}
  company2: function(){
    var company= "Google,Inc.";
    return company;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername3: function(){
    var name3= "$112.25";
    return name3;
  },
  //gave names for dyamic access {{getheadername4}}
  getheadername4: function(){
    var name4= "-0.74 (-0.6%)";
    return name4;
  },
  company: function()
       {
           //object that is used throughout the html
           var c = {
               formalName: "San Francisco",
               informalName: "San Francisco",
               ticker: "FB"
           };
           return c;
       },
  //loads data for the image
  quote:[
    {name: 'Wichita, KS', text2: '5'},
    {name: 'Nashville, TN', text2: '15'},
    {name: 'Newyork, NY', text2: '200'},
    {name: 'Boston, MA', text2: '84'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", totalcompanies: "30", data: "Mountain View, CA", location: "Cupertino, CA", fall: "true", number: "$712 Billion", stck1: "$112.25", stck2: "-0.74 (-0.6%)", date: "as of 8/12/2015", following: "true" },
    { counter_no: "2", totalcompanies: "15", data: "Cupertino, CA", location: "Mountain View, CA", google: "true", fall: "true", number: "$449 Billion",  stck1: "$659.89", stck2: "-1.54 (-0.23%)", date: "as of 8/12/2015" },
    { counter_no: "3", totalcompanies: "#19", data: "REdwood City, CA", location: "Mountain View, CA", google: "true", fall: "true", number: "$428 Billion",  stck1: "$629.48", stck2: "-2.54 (-0.23%)", date: "as of 8/12/2015"},
    {imghld: "true"},
    { counter_no: "4", totalcompanies: "#15", data: "San Jose, CA", location: "Redmond, WA", number: "$383 Billion",  stck1: "$46.69", stck2: "+0.39 (+0.85%)", date: "as of 8/12/2015", following: "true" },
    { counter_no: "5", totalcompanies: "#8", data: "Oakland, CA", location: "Redmond, WA", number: "$350 Billion",  stck1: "$214,400", stck2: "+80.00 (+0.04%)", date: "as of 8/12/2015", following: "true"}
  ],
  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }
});
//This handles the events on button clicks of 1,2,3 and 200
Template.nearby_cities_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .nerby_pg-page-selector1': function()
    {
        $(".nerby_pg-page-selector1").css("background-color","#3098ff");
        $(".nerby_pg-page-selector2").css("background-color","#ffffff");
        $(".nerby_pg-page-selector3").css("background-color","#ffffff");
        $(".nerby_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .nerby_pg-page-selector2': function()
    {
        $(".nerby_pg-page-selector2").css("background-color","#3098ff");
        $(".nerby_pg-page-selector1").css("background-color","#ffffff");
        $(".nerby_pg-page-selector3").css("background-color","#ffffff");
        $(".nerby_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .nerby_pg-page-selector3': function()
    {
        $(".nerby_pg-page-selector3").css("background-color","#3098ff");
        $(".nerby_pg-page-selector2").css("background-color","#ffffff");
        $(".nerby_pg-page-selector1").css("background-color","#ffffff");
        $(".nerby_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .nerby_pg-page-selector200': function()
    {
        $(".nerby_pg-page-selector200").css("background-color","#3098ff");
        $(".nerby_pg-page-selector2").css("background-color","#ffffff");
        $(".nerby_pg-page-selector3").css("background-color","#ffffff");
        $(".nerby_pg-page-selector1").css("background-color","#ffffff");
    }
});

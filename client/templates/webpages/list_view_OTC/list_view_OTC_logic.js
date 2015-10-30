/*
Author: Sindhusha
Created: 10/26/2015
Description: list_view_OTC_logic.js
Associated Files: list_view_OTC.less and list_view_OTC.html
*/

var counter=0;

//renders the data when page loads
Template.list_view_OTC.onRendered(function () {
$(".OTC-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.list_view_OTC.helpers({
//gives the location
    getlocation: function(){
      var loc= "The United States of America";
      return loc;
    },
    ///gives the profile name
    getfname: function(){
      var loc= "[Profile]";
      return loc;
    },
//gives the catogery  name
    getCompany: function(){
      var cname= "OTC";
      return cname;
    },
//gives the company name
  getCname: function(){
    var com= "Apple, Inc.";
    return com;
  },
  //gives the stock value
  getstock1: function(){
    var stock1= "$712 Billion";
    return stock1;
  },
  //gives the stock value
  getstock2: function(){
    var stock2= "$112.25";
    return stock2;
  },
  //gives the stock value
  getstock3: function(){
    var stock3= "-0.74 (-0.6%)";
    return stock3;
  },
  //loads data for the image
  quote:[
    {name: 'Exxon Mobile Corp.', text: '$46.69 ', text2: ' +0.39(+0.85%)'},
    {name: 'Johnson & Johnson', text: '$99.55 ', text2: ' +0.18(+0.18%)'},
    {name: 'Facebook Inc.', text: '$94.31 ', text2: ' +2.68(+2.76%)'},
    {name: 'Wells Fargo & Co.', text: '$58.07 ', text2: ' +0.18(+0.13%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", color: "#f2f2f2", data: "Apple, Inc.",stocks: "NASDAQ", sname:"APPL", location: "Cupertino, CA", fall: "true", number: "$712 Billion", stck1: "$112.25", stck2: "-0.74 (-0.6%)", date: "as of 07/30/2015", following: "true" },
    { counter_no: "2", color: "#ffffff", data: "Google, Inc.", stocks: "NASDAQ", sname:"Goog",location: "Mountain View, CA", google: "true", fall: "true", number: "$449 Billion",  stck1: "$659.89", stck2: "-1.54 (-0.23%)", date: "as of 07/30/2015" },
    { counter_no: "3", color: "#f2f2f2", data: "Google, Inc.",stocks: "NASDAQ", sname:"Goog", location: "Mountain View, CA", google: "true", fall: "true", number: "$428 Billion",  stck1: "$629.48", stck2: "-2.54 (-0.23%)", date: "as of 07/30/2015"},
    {imghld: "true"},
    { counter_no: "4", color: "#f2f2f2", data: "Microsoft Corporation",stocks: "NASDAQ", sname:"MSCF", location: "Redmond, WA", number: "$383 Billion",  stck1: "$46.69", stck2: "+0.39 (+0.85%)", date: "as of 07/30/2015", following: "true" },
    { counter_no: "5", color: "#f2f2f2", data: "Bershire Hathaway",stocks: "NASDAQ", sname:"BEHA", location: "Redmond, WA", number: "$350 Billion",  stck1: "$214,400", stck2: "+80.00 (+0.04%)", date: "as of 07/30/2015", following: "true"}
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
Template.list_view_OTC.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .OTC-page-selector1': function()
    {
        $(".OTC-page-selector1").css("background-color","#3098ff");
        $(".OTC-page-selector2").css("background-color","#ffffff");
        $(".OTC-page-selector3").css("background-color","#ffffff");
        $(".OTC-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .OTC-page-selector2': function()
    {
        $(".OTC-page-selector2").css("background-color","#3098ff");
        $(".OTC-page-selector1").css("background-color","#ffffff");
        $(".OTC-page-selector3").css("background-color","#ffffff");
        $(".OTC-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .OTC-page-selector3': function()
    {
        $(".OTC-page-selector3").css("background-color","#3098ff");
        $(".OTC-page-selector2").css("background-color","#ffffff");
        $(".OTC-page-selector1").css("background-color","#ffffff");
        $(".OTC-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .OTC-page-selector200': function()
    {
        $(".OTC-page-selector200").css("background-color","#3098ff");
        $(".OTC-page-selector2").css("background-color","#ffffff");
        $(".OTC-page-selector3").css("background-color","#ffffff");
        $(".OTC-page-selector1").css("background-color","#ffffff");
    }
});

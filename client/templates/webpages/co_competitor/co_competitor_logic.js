/*
Author: jyothyswaroop
Created: 08/10/2015
Description: co_competitor page
Associated Files: co_competitor.less and co_competitor.html
*/
var counter=0;

//renders the data when page loads
Template.co_competitor.onRendered(function () {
$(".co_comp-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.co_competitor.helpers({
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Facebook, Inc.";
    return name;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername2: function(){
    var name2= "$94.14";
    return name2;
  },
  //gave names for dyamic access {{getheadername4}}
  getheadername3: function(){
    var name3= "+0.13 (+0.14%)";
    return name3;
  },
  // get the name for heading
  company: function()
       {
           //object that is used throughout the html
           var c = {
               formalName: "Facebook, Inc",
               informalName: "San Francisco",
               ticker: "FB"
           };
           return c;
       },
  //loads data for the image
  quote:[
    {name: 'Apple,Inc.', text: '$118.44', text2: ' -2.86(-2.36%)'},
    {name: 'Hewlett-Packard', text: '$30.02', text2: ' +0.50(+1.64%)'},
    {name: 'IBM', text: '$158.67', text2: ' -3.32(-2.05%)'},
    {name: 'Amazon.com,Inc.', text: '$158.67', text2: '-1.12(-0.21%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", data: "Google, Inc.", location: "Cupertino, CA", stocks: "NASDAQ", sname:"GOOG", number: "14 Billion", stck1: "$631.21", stck2: "+5.60 (+0.90%)", diff: "+571.5%",comp:"compared to FB", diffg: "true" },
    { counter_no: "2", data: "Linkedin Corp", location: "Mountain View, CA", stocks: "NYSE", sname:"LNKD", fall: "true", number: "25.35 Billion",  stck1: "$196.82", stck2: "-6.44 (-3.17%)", diff: "108.51%",comp:"compared to FB", diffg: "true"  },
    { counter_no: "3", data: "Yahoo!, Inc.", location: "Mountain View, CA", stocks: "NYSE", sname:"YHOO",  number: "34.32 Billion",  stck1: "$36.69", stck2: "+0.02 (+0.05%)", diff: "-61.71%",comp:"compared to FB" },
    {imghld: "true"},
    { counter_no: "4", data: "Twitter,Inc.", location: "Redmond, WA", stocks: "NYSE", sname:"TWTR", fall: "true", number: "19.77 Billion",  stck1: "$29.25", stck2: "-1.76 (-5.68%)", diff: "-144%", following: "true",comp:"compared to FB" },
    //{ counter_no: "5", color: "#f2f2f2", data: "Bershire Hathaway", location: "Redmond, WA", stocks: "NASDAQ", sname:"GOOG", number: "$350 Billion",  stck1: "$214,400", stck2: "+80.00 (+0.04%)", date: "as of 07/30/2015", following: "true"}
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
Template.co_competitor.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_comp-page-selector1': function()
    {
        $(".co_comp-page-selector1").css("background-color","#3098ff");
        $(".co_comp-page-selector2").css("background-color","#ffffff");
        $(".co_comp-page-selector3").css("background-color","#ffffff");
        $(".co_comp-page-selector200").css("background-color","#ffffff");
    },
});

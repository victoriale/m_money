/*
Author: jyothyswaroop
Created: 8/12/2015
Description: market_recap_page
Associated Files: market_recap_page.less and market_recap_page.html
*/
var counter=0;

//renders the data when page loads
Template.market_recap_page.onRendered(function () {
$(".mark_pg-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.market_recap_page.helpers({
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "NYSE";
      return name1;
    },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Apple, Inc.";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "$712 Billion";
    return name2;
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
  //loads data for the image
  quote:[
    {name: 'Exxon Mobile Corp.', text: '$46.69 ', text2: ' +0.39(+0.85%)'},
    {name: 'Johnson & Johnson', text: '$99.55 ', text2: ' +0.18(+0.18%)'},
    {name: 'Facebook Inc.', text: '$94.31 ', text2: ' +2.68(+2.76%)'},
    {name: 'Wells Fargo & Co.', text: '$58.07 ', text2: ' +0.18(+0.13%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", color: "#f2f2f2", data: "Apple, Inc.",stocks: "NASDAQ", sname:"APPL", location: "Cupertino, CA", fall: "true", number: "$712 Billion", stck1: "$112.25", stck2: "-0.74 (-0.6%)", date: "as of 8/12/2015", following: "true" },
    { counter_no: "2", color: "#ffffff", data: "Google, Inc.", stocks: "NASDAQ", sname:"Goog",location: "Mountain View, CA", google: "true", fall: "true", number: "$449 Billion",  stck1: "$659.89", stck2: "-1.54 (-0.23%)", date: "as of 8/12/2015" },
    { counter_no: "3", color: "#f2f2f2", data: "Google, Inc.",stocks: "NASDAQ", sname:"Goog", location: "Mountain View, CA", google: "true", fall: "true", number: "$428 Billion",  stck1: "$629.48", stck2: "-2.54 (-0.23%)", date: "as of 8/12/2015"},
    {imghld: "true"},
    { counter_no: "4", color: "#f2f2f2", data: "Microsoft Corporation",stocks: "NASDAQ", sname:"MSCF", location: "Redmond, WA", number: "$383 Billion",  stck1: "$46.69", stck2: "+0.39 (+0.85%)", date: "as of 8/12/2015", following: "true" },
    { counter_no: "5", color: "#f2f2f2", data: "Bershire Hathaway",stocks: "NASDAQ", sname:"BEHA", location: "Redmond, WA", number: "$350 Billion",  stck1: "$214,400", stck2: "+80.00 (+0.04%)", date: "as of 8/12/2015", following: "true"}
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
Template.market_recap_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .mark_pg-page-selector1': function()
    {
        $(".mark_pg-page-selector1").css("background-color","#3098ff");
        $(".mark_pg-page-selector2").css("background-color","#ffffff");
        $(".mark_pg-page-selector3").css("background-color","#ffffff");
        $(".mark_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .mark_pg-page-selector2': function()
    {
        $(".mark_pg-page-selector2").css("background-color","#3098ff");
        $(".mark_pg-page-selector1").css("background-color","#ffffff");
        $(".mark_pg-page-selector3").css("background-color","#ffffff");
        $(".mark_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .mark_pg-page-selector3': function()
    {
        $(".mark_pg-page-selector3").css("background-color","#3098ff");
        $(".mark_pg-page-selector2").css("background-color","#ffffff");
        $(".mark_pg-page-selector1").css("background-color","#ffffff");
        $(".mark_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .mark_pg-page-selector200': function()
    {
        $(".mark_pg-page-selector200").css("background-color","#3098ff");
        $(".mark_pg-page-selector2").css("background-color","#ffffff");
        $(".mark_pg-page-selector3").css("background-color","#ffffff");
        $(".mark_pg-page-selector1").css("background-color","#ffffff");
    }
});

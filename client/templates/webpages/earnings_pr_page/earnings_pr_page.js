/*
Author: Zachary Pearson
Created: 9/10/2015
Description: previously_released_earnings_page
Associated Files: previously_released_earnings_page.less and previously_released_earnings_page.html
*/
var counter=0;

//renders the data when page loads
Template.earnings_pr_page.onRendered(function () {
$(".cokey_fin-page-selector1").css("background-color","#3098ff");
  $(".cokey_fin-page-selector1").css("color","#ffffff");

});

var backgroundStyle="tilewhite";
Template.earnings_pr_page.helpers({
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "Previously Released Earnings";
      return name1;
    },
//gave names for dyamic access {{getheadername}}
    compname: function(){
      var noof= "United States Public Companies";
      return noof;
    },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Mountain View, CA";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "Apple, Inc.";
    return name2;
  },
  date: function(){
    var date = "11/26/2015";
    return date;
  },
  //gave names for dyamic access {{getheadername2}}
  personname : function(){
    var name= "Mark Zuckerberg";
    return name;
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
               formalName: "Apple, Inc.",
               informalName: "San Francisco",
               ticker: "FB"
           };
           return c;
       },
  //loads data for the image
  quote:[
    {name: 'Exxon Mobil Corp.', text1: '$46.69' ,text2: '+0.39(+0.85%)'},
    {name: 'Johnson & Johnson', text1: '$99.69' ,text2: '+0.18(+0.18%)'},
    {name: 'Facebook Inc', text1: '$54.69' ,text2: '+2.68(+2.76%)'},
    {name: 'Wells Fargo & Co', text1: '$106.69' ,text2: '+0.18(+0.13%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", repo: "2015 Q1 Earnings Report", data: "Apple, Inc.", location: "Cupertino, CA", number: "$712 Billion", ndata: "07/30/2015", date: "as of 8/12/2015" },
    { counter_no: "2", repo: "2014 Fiscal Year Report", data: "AMC Network, Inc.", location: "New York, NY", number: "$449 Billion", ndata: "07/28/2015", date: "as of 8/12/2015" },
    { counter_no: "3", repo: "2015 Q1 Earnings Report", data: "Google, Inc.", location: "Mountain View, CA",  number: "$428 Billion", ndata: "07/25/2015",  date: "as of 8/12/2015"},
    {imghld: "true"},
    { counter_no: "4", repo: "2015 Q1 Earnings Report", data: "Zynga, Inc.", location: "Redmond, WA", number: "$383 Billion",  ndata: "07/19/2015",  date: "as of 8/12/2015" },
    { counter_no: "5", repo: "2015 Q1 Earnings Report", data: "Comcast Corporation", location: "Cupertino, CA", number: "$350 Billion",  ndata: "07/10/2015",   date: "as of 8/12/2015"}
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
Template.earnings_pr_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cokey_fin-page-selector1': function()
    {
        $(".cokey_fin-page-selector1").css("background-color","#3098ff");
        $(".cokey_fin-page-selector1").css("color","#ffffff");
        $(".cokey_fin-page-selector2").css("color","#000");
        $(".cokey_fin-page-selector3").css("color","#000");
        $(".cokey_fin-page-selector200").css("color","#000");
        $(".cokey_fin-page-selector2").css("background-color","#ffffff");
        $(".cokey_fin-page-selector3").css("background-color","#ffffff");
        $(".cokey_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cokey_fin-page-selector2': function()
    {
        $(".cokey_fin-page-selector2").css("background-color","#3098ff");
        $(".cokey_fin-page-selector2").css("color","#ffffff");
        $(".cokey_fin-page-selector1").css("color","#000");
        $(".cokey_fin-page-selector3").css("color","#000");
        $(".cokey_fin-page-selector200").css("color","#000");
        $(".cokey_fin-page-selector1").css("background-color","#ffffff");
        $(".cokey_fin-page-selector3").css("background-color","#ffffff");
        $(".cokey_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cokey_fin-page-selector3': function()
    {
        $(".cokey_fin-page-selector3").css("background-color","#3098ff");
        $(".cokey_fin-page-selector3").css("color","#ffffff");
        $(".cokey_fin-page-selector1").css("color","#000");
        $(".cokey_fin-page-selector2").css("color","#000");
        $(".cokey_fin-page-selector200").css("color","#000");
        $(".cokey_fin-page-selector2").css("background-color","#ffffff");
        $(".cokey_fin-page-selector1").css("background-color","#ffffff");
        $(".cokey_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cokey_fin-page-selector200': function()
    {
        $(".cokey_fin-page-selector200").css("background-color","#3098ff");
        $(".cokey_fin-page-selector200").css("color","#ffffff");
        $(".cokey_fin-page-selector1").css("color","#000");
        $(".cokey_fin-page-selector2").css("color","#000");
        $(".cokey_fin-page-selector3").css("color","#000");
        $(".cokey_fin-page-selector2").css("background-color","#ffffff");
        $(".cokey_fin-page-selector3").css("background-color","#ffffff");
        $(".cokey_fin-page-selector1").css("background-color","#ffffff");
    }
});

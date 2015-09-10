/*
Author: jyothyswaroop
Created: 9/2/2015
Description: upcoming_earnings_page
Associated Files: upcoming_earnings_page.less and upcoming_earnings_page.html
*/
var counter=0;

//renders the data when page loads
Template.upcoming_earnings_page.onRendered(function () {
$(".upear_pg-page-selector1").css("background-color","#3098ff");
  $(".upear_pg-page-selector1").css("color","#ffffff");

});

var backgroundStyle="tilewhite";
Template.upcoming_earnings_page.helpers({
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "Earnings Release Calender";
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
    { counter_no: "1", repo: "2015 Q1 Earnings Report", data: "Apple, Inc.", location: "Cupertino, CA", number: "$712 Billion", reldate: "08/13/2015", date: "as of 8/12/2015" },
    { counter_no: "2", repo: "2015 Q1 Earnings Report", data: "AMC Network, Inc", location: "Mountain View, CA", number: "$449 Billion", reldate: "08/13/2015", date: "as of 8/12/2015" },
    { counter_no: "3", repo: "2015 Q1 Earnings Report", data: "Google, Inc", location: "Mountain View, CA",  number: "$428 Billion", reldate: "08/13/2015",  date: "as of 8/12/2015"},
    {imghld: "true"},
    { counter_no: "4", repo: "2015 Q1 Earnings Report", data: "Zynga, Inc.", location: "Redmond, WA", number: "$383 Billion",  reldate: "08/13/2015",  date: "as of 8/12/2015" },
    { counter_no: "5", repo: "2015 Q1 Earnings Report", data: "Comcast Corporation", location: "Redmond, WA", number: "$350 Billion",  reldate: "08/13/2015",   date: "as of 8/12/2015"}
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
Template.upcoming_earnings_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .upear_pg-page-selector1': function()
    {
        $(".upear_pg-page-selector1").css("background-color","#3098ff");
        $(".upear_pg-page-selector1").css("color","#ffffff");
        $(".upear_pg-page-selector2").css("color","#000");
        $(".upear_pg-page-selector3").css("color","#000");
        $(".upear_pg-page-selector200").css("color","#000");
        $(".upear_pg-page-selector2").css("background-color","#ffffff");
        $(".upear_pg-page-selector3").css("background-color","#ffffff");
        $(".upear_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .upear_pg-page-selector2': function()
    {
        $(".upear_pg-page-selector2").css("background-color","#3098ff");
        $(".upear_pg-page-selector2").css("color","#ffffff");
        $(".upear_pg-page-selector1").css("color","#000");
        $(".upear_pg-page-selector3").css("color","#000");
        $(".upear_pg-page-selector200").css("color","#000");
        $(".upear_pg-page-selector1").css("background-color","#ffffff");
        $(".upear_pg-page-selector3").css("background-color","#ffffff");
        $(".upear_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .upear_pg-page-selector3': function()
    {
        $(".upear_pg-page-selector3").css("background-color","#3098ff");
        $(".upear_pg-page-selector3").css("color","#ffffff");
        $(".upear_pg-page-selector1").css("color","#000");
        $(".upear_pg-page-selector2").css("color","#000");
        $(".upear_pg-page-selector200").css("color","#000");
        $(".upear_pg-page-selector2").css("background-color","#ffffff");
        $(".upear_pg-page-selector1").css("background-color","#ffffff");
        $(".upear_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .upear_pg-page-selector200': function()
    {
        $(".upear_pg-page-selector200").css("background-color","#3098ff");
        $(".upear_pg-page-selector200").css("color","#ffffff");
        $(".upear_pg-page-selector1").css("color","#000");
        $(".upear_pg-page-selector2").css("color","#000");
        $(".upear_pg-page-selector3").css("color","#000");
        $(".upear_pg-page-selector2").css("background-color","#ffffff");
        $(".upear_pg-page-selector3").css("background-color","#ffffff");
        $(".upear_pg-page-selector1").css("background-color","#ffffff");
    }
});

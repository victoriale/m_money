/*
Author: jyothyswaroop
Created: 9/2/2015
Description: co_sec_docs
Associated Files: co_sec_docs.less and co_sec_docs.html
*/
var counter=0;

//renders the data when page loads
Template.co_sec_docs.onRendered(function () {
$(".cosecd_fin-page-selector1").css("background-color","#3098ff");
  $(".cosecd_fin-page-selector1").css("color","#ffffff");

});

var backgroundStyle="tilewhite";
Template.co_sec_docs.helpers({
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "United States";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "SEC Documents";
      return name1;
    },
//gave names for dyamic access {{getheadername}}
    compname: function(){
      var noof= "Facebook, Inc.";
      return noof;
    },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Mountain View, CA";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "Filing 4 - Sequence #071582";
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
    { counter_no: "1", repo: "Insider Transaction", data: "Filing 4", location: "Cupertino, CA", number: "$712 Billion", ndata: "071582", date: "as of 8/12/2015" },
    { counter_no: "2", repo: "Registration Statement", data: "Filing 424B4", location: "Mountain View, CA", number: "$449 Billion", ndata: "419770", date: "as of 8/12/2015" },
    { counter_no: "3", repo: "Uncategorized", data: "Filing EFFECT", location: "Mountain View, CA",  number: "$428 Billion", ndata: "003465",  date: "as of 8/12/2015"},
    {imghld: "true"},
    { counter_no: "4", repo: "Insider Transaction", data: "Filing S-1/A", location: "Redmond, WA", number: "$383 Billion",  ndata: "415127",  date: "as of 8/12/2015" },
    { counter_no: "5", repo: "Insider Transaction", data: "Filing 4", location: "Redmond, WA", number: "$350 Billion",  ndata: "001582",   date: "as of 8/12/2015"}
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
Template.co_sec_docs.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cosecd_fin-page-selector1': function()
    {
        $(".cosecd_fin-page-selector1").css("background-color","#3098ff");
        $(".cosecd_fin-page-selector1").css("color","#ffffff");
        $(".cosecd_fin-page-selector2").css("color","#000");
        $(".cosecd_fin-page-selector3").css("color","#000");
        $(".cosecd_fin-page-selector200").css("color","#000");
        $(".cosecd_fin-page-selector2").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector3").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cosecd_fin-page-selector2': function()
    {
        $(".cosecd_fin-page-selector2").css("background-color","#3098ff");
        $(".cosecd_fin-page-selector2").css("color","#ffffff");
        $(".cosecd_fin-page-selector1").css("color","#000");
        $(".cosecd_fin-page-selector3").css("color","#000");
        $(".cosecd_fin-page-selector200").css("color","#000");
        $(".cosecd_fin-page-selector1").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector3").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cosecd_fin-page-selector3': function()
    {
        $(".cosecd_fin-page-selector3").css("background-color","#3098ff");
        $(".cosecd_fin-page-selector3").css("color","#ffffff");
        $(".cosecd_fin-page-selector1").css("color","#000");
        $(".cosecd_fin-page-selector2").css("color","#000");
        $(".cosecd_fin-page-selector200").css("color","#000");
        $(".cosecd_fin-page-selector2").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector1").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .cosecd_fin-page-selector200': function()
    {
        $(".cosecd_fin-page-selector200").css("background-color","#3098ff");
        $(".cosecd_fin-page-selector200").css("color","#ffffff");
        $(".cosecd_fin-page-selector1").css("color","#000");
        $(".cosecd_fin-page-selector2").css("color","#000");
        $(".cosecd_fin-page-selector3").css("color","#000");
        $(".cosecd_fin-page-selector2").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector3").css("background-color","#ffffff");
        $(".cosecd_fin-page-selector1").css("background-color","#ffffff");
    }
});

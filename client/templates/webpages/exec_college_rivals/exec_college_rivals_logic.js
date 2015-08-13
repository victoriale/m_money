/*
Author: jyothyswaroop
Created: 08/10/2015
Description: exec_college_rivals page
Associated Files: exec_college_rivals.less and exec_college_rivals.html
*/
var counter=0;

//renders the data when page loads
Template.exec_college_rivals.onRendered(function () {
$(".exr_riva-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.exec_college_rivals.helpers({
//gave names for dyamic access {{getheadername}}
  getheadername0: function(){
    var name0= "College Rivals";
    return name0;
  },
//gave names for dyamic access {{getheadername}}
  getheadername1: function(){
    var name1= "Mark Zuckerberg";
    return name1;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername2: function(){
    var name2= "Tony Hsieh";
    return name2;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername3: function(){
    var name3= "Amazon, Inc.";
    return name3;
  },
  //gave names for dyamic access cureent date {{getheadername4}}
  getheadername4: function(){
  var name4="$588.15";
  return name4;
  },
  //gave names for dyamic access cureent date {{getheadername5}}
  getheadername5: function(){
  var name5="+0.22 (+0.23%)";
  return name5;
  },
  //gave names for dyamic access cureent date {{getheadername6}}
  getheadername6: function(){
  var name6="Tony Hsieh graduated from Harvard University in 1995 and is know the Cheif Executive Officer of Zappos, Inc. During his tenure at Harvard he earned his BS in Computer Science.";
  return name6;
  },
  //gave names for dyamic access cureent date {{getheadername5}}
  getheadername7: function(){
  var name7="Harvard University";
  return name7;
  },
  //gave names for dyamic access cureent date {{getheadername5}}
  getheadername8: function(){
  var name8="Cambridge, Massachusetts";
  return name8;
  },
  // get the name for heading
  company: function()
       {
           //object that is used throughout the html
           var c = {
               formalName: "Mark Zuckerberg",
               informalName: "San Francisco",
               ticker: "FB"
           };
           return c;
       },

  //loads data for the image
  quote:[
    {name: 'Exxon Mobil Corp.', text: '$46.69', text2: '+0.39(+0.85%)'},
    {name: 'Johnson & Johnson', text: '$99.55', text2: '+0.18(+0.18%)'},
    {name: 'Facebook Inc', text: '$94.31', text2: '+2.68(+2.76%)'},
    {name: 'Wells Fargo & Co', text: '$58.07', text2: '+0.18(+0.13%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", data: "Tony Hsiesh", location: "Las Vegas, NV", year: "1996", desg:"Cheif Exective Officer", educ:"Computer Science - BS", grp:"Zappos, Inc"},
    { counter_no: "2", data: "Abigail Johnson", location: "Whichta, KS", year: "1988", desg:"Chairman", educ:"MBA", grp:"Fidelity Worldwide Investment"},
    { counter_no: "3", data: "Meg Whiteman", location: "Huntington, NY", year: "1979", desg:"Cheif Exective Officer", educ:"MBA", grp:"Hewlett-Packard" },
    {imghld: "true"},
    { counter_no: "4", data: "Jim Koch", location: "Boston, MA", year: "1978", desg:"Cheif Exective Officer & Founder", educ:"MBA", grp:"Boston Beer Company" },
    { counter_no: "5", data: "Robert Kraft", location: "Harvard, MA", year: "1965", desg:"Cheif Exective Officer & Chairman", educ:"MBA", grp:"Kraft Group"}
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
Template.exec_college_rivals.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exr_riva-page-selector1': function()
    {
        $(".exr_riva-page-selector1").css("background-color","#3098ff");
        $(".exr_riva-page-selector2").css("background-color","#ffffff");
        $(".exr_riva-page-selector3").css("background-color","#ffffff");
        $(".exr_riva-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exr_riva-page-selector2': function()
    {
        $(".exr_riva-page-selector2").css("background-color","#3098ff");
        $(".exr_riva-page-selector1").css("background-color","#ffffff");
        $(".exr_riva-page-selector3").css("background-color","#ffffff");
        $(".exr_riva-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exr_riva-page-selector3': function()
    {
        $(".exr_riva-page-selector3").css("background-color","#3098ff");
        $(".exr_riva-page-selector2").css("background-color","#ffffff");
        $(".exr_riva-page-selector1").css("background-color","#ffffff");
        $(".exr_riva-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exr_riva-page-selector200': function()
    {
        $(".exr_riva-page-selector200").css("background-color","#3098ff");
        $(".exr_riva-page-selector2").css("background-color","#ffffff");
        $(".exr_riva-page-selector3").css("background-color","#ffffff");
        $(".exr_riva-page-selector1").css("background-color","#ffffff");
    }
});

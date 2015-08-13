/*
Author: jyothyswaroop
Created: 08/10/2015
Description: co_board_committee page
Associated Files: co_board_committee.less and co_board_committee.html
*/
var counter=0;

//renders the data when page loads
Template.co_board_committee.onRendered(function () {
$(".co_commi-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.co_board_committee.helpers({
//gave names for dyamic access {{getheadername}}
  getheadername0: function(){
    var name0= "Board and Committe";
    return name0;
  },
//gave names for dyamic access {{getheadername}}
  getheadername1: function(){
    var name1= "Facebook, Inc.";
    return name1;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername2: function(){
    var name2= "Mark Zuckerberg";
    return name2;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername3: function(){
    var name3= "44.98 Billion USD";
    return name3;
  },
  //gave names for dyamic access cureent date {{getheadername4}}
  getheadername4: function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = mm+'/'+dd+'/'+yyyy;
    return today;
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
    {name: 'Exxon Mobil Corp.', text: '$46.69', text2: '+0.39(+0.85%)'},
    {name: 'Johnson & Johnson', text: '$99.55', text2: '+0.18(+0.18%)'},
    {name: 'Facebook Inc', text: '$94.31', text2: '+2.68(+2.76%)'},
    {name: 'Wells Fargo & Co', text: '$58.07', text2: '+0.18(+0.13%)'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", data: "Mark Zuckerberg.", location: "Menlo Park, CA", number: "38.3 Million", comp:"Cheif Exective Officer and Chairman"},
    { counter_no: "2", data: "Sheryl Sandberg", location: "Menlo Park, CA", number: "30 Million", comp:"Cheif Operating Officer and Director"},
    { counter_no: "3", data: "Marc Andreessen", location: "Menlo Park, CA", number: "30 Million", comp:"Co-Founder and General Partner" },
    {imghld: "true"},
    { counter_no: "4", data: "Erskine B.Bowles", location: "Menlo Park, CA", number: "25 Million", comp:"Director" },
    { counter_no: "5", data: "Susan Desmond-Hellmann", location: "Menlo Park, CA", number: "10 Million", comp:"Lead Indpendent Director"}
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
Template.co_board_committee.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_commi-page-selector1': function()
    {
        $(".co_commi-page-selector1").css("background-color","#3098ff");
        $(".co_commi-page-selector2").css("background-color","#ffffff");
        $(".co_commi-page-selector3").css("background-color","#ffffff");
        $(".co_commi-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_commi-page-selector2': function()
    {
        $(".co_commi-page-selector2").css("background-color","#3098ff");
        $(".co_commi-page-selector1").css("background-color","#ffffff");
        $(".co_commi-page-selector3").css("background-color","#ffffff");
        $(".co_commi-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_commi-page-selector3': function()
    {
        $(".co_commi-page-selector3").css("background-color","#3098ff");
        $(".co_commi-page-selector2").css("background-color","#ffffff");
        $(".co_commi-page-selector1").css("background-color","#ffffff");
        $(".co_commi-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .co_commi-page-selector200': function()
    {
        $(".co_commi-page-selector200").css("background-color","#3098ff");
        $(".co_commi-page-selector2").css("background-color","#ffffff");
        $(".co_commi-page-selector3").css("background-color","#ffffff");
        $(".co_commi-page-selector1").css("background-color","#ffffff");
    }
});

/*
Author: jyothyswaroop
Created: 07/30/2015
Description: followers page
Associated Files: followers_page.less and followers_page.html
*/
var counter=0;

//renders when page loads gets the data
Template.followers_page.onRendered(function () {
$(".foll_pg-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
//gave names for dyamic access {{getheadername}}
Template.followers_page.helpers({
  getheadername: function(){
    var name= "Emily Clarke";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "Emily";
    return name2;
  },
  //images data dynamcialls calls 
  quote:[
    {name: 'Kayne West', text: 'Followers ', followers: ' 95.4k'},
    {name: 'Beyonce Knowels', text: 'Followers ', followers: ' 1.01M'},
    {name: 'Florence Welch', text: 'Followers ', followers: ' 998.1k'},
    {name: 'Britney Spears', text: 'Followers ', followers: ' 1.2M'}
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", color: "#f2f2f2", data: "Tommy Lofgren", location: "Tiburon, CA", number: "310", date: "as of 06/30/2015", following: "true", followers:"10K" },
    { counter_no: "2", color: "#ffffff", data: "Adam Clyde", location: "San Rafael, CA", number: "298", date: "as of 06/30/2015", followers:"9.8K" },
    { counter_no: "3", color: "#f2f2f2", data: "Cameron Brocksen", location: "San Francisco, CA", number: "250", date: "as of 06/30/2015", followers:"335"},
    {imghld: "true"},
    { counter_no: "4", color: "#f2f2f2", data: "Jacob Turner", location: "Novato, CA", number: "225", date: "as of 06/30/2015", following: "true", followers:"100" },
    { counter_no: "5", color: "#f2f2f2", data: "James Mason", location: "Petaluma, CA", number: "147", date: "as of 06/30/2015", following: "true", followers:"3"}
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
Template.followers_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .foll_pg-page-selector1': function()
    {
        $(".foll_pg-page-selector1").css("background-color","#3098ff");
        $(".foll_pg-page-selector2").css("background-color","#ffffff");
        $(".foll_pg-page-selector3").css("background-color","#ffffff");
        $(".foll_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .foll_pg-page-selector2': function()
    {
        $(".foll_pg-page-selector2").css("background-color","#3098ff");
        $(".foll_pg-page-selector1").css("background-color","#ffffff");
        $(".foll_pg-page-selector3").css("background-color","#ffffff");
        $(".foll_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .foll_pg-page-selector3': function()
    {
        $(".foll_pg-page-selector3").css("background-color","#3098ff");
        $(".foll_pg-page-selector2").css("background-color","#ffffff");
        $(".foll_pg-page-selector1").css("background-color","#ffffff");
        $(".foll_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .foll_pg-page-selector200': function()
    {
        $(".foll_pg-page-selector200").css("background-color","#3098ff");
        $(".foll_pg-page-selector2").css("background-color","#ffffff");
        $(".foll_pg-page-selector3").css("background-color","#ffffff");
        $(".foll_pg-page-selector1").css("background-color","#ffffff");
    }
});

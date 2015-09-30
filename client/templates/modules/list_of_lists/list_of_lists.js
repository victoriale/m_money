/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.list_of_lists.onRendered(function () {
$(".list_of_lists-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle1="tilewhite";
Template.list_of_lists.helpers({

  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "4", color: "#f2f2f2", data: "Top 100 most actively traded public stocks in California in the past 6 months" },
    { counter_no: "16", color: "#ffffff", data: "Top 100 largest percentage losing public stocks in California this week." },
    { counter_no: "1", color: "#f2f2f2", data: "Top 100 Executive who have donated over 1 million USDs in 2014." }
  ],
  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle1 === "tilegrey")
    {
      backgroundStyle1="tilewhite";
      return backgroundStyle1;
    } else {
      backgroundStyle1 = "tilegrey";
      return backgroundStyle1;
    }
  }
});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_of_lists.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .list_of_lists-page-selector1': function()
    {
        $(".list_of_lists-page-selector1").css("background-color","#3098ff");
        $(".list_of_lists-page-selector2").css("background-color","#ffffff");
        $(".list_of_lists-page-selector3").css("background-color","#ffffff");
        $(".list_of_lists-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .list_of_lists-page-selector2': function()
    {
        $(".list_of_lists-page-selector2").css("background-color","#3098ff");
        $(".list_of_lists-page-selector1").css("background-color","#ffffff");
        $(".list_of_lists-page-selector3").css("background-color","#ffffff");
        $(".list_of_lists-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .list_of_lists-page-selector3': function()
    {
        $(".list_of_lists-page-selector3").css("background-color","#3098ff");
        $(".list_of_lists-page-selector2").css("background-color","#ffffff");
        $(".list_of_lists-page-selector1").css("background-color","#ffffff");
        $(".list_of_lists-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .list_of_lists-page-selector200': function()
    {
        $(".list_of_lists-page-selector200").css("background-color","#3098ff");
        $(".list_of_lists-page-selector2").css("background-color","#ffffff");
        $(".list_of_lists-page-selector3").css("background-color","#ffffff");
        $(".list_of_lists-page-selector1").css("background-color","#ffffff");
    }
});

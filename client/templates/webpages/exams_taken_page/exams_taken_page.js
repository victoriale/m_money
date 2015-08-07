/*
Author: jyothyswaroop
Created: 07/30/2015
Description: exams_taken_page
Associated Files: exams_taken_page.less and exams_taken_page.html
*/
var counter=0;
//renders the data when page loads
Template.exams_taken_page.onRendered(function () {
$(".exm_tk-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";

Template.exams_taken_page.helpers({

//loads data dynamically for images
  quote:[
    {name: 'Molly Carapiet', text: 'Exams Aced ', followers: ' 35'},
    {name: 'Michael Ta Vo', text: 'Exams Aced ', followers: ' 29'},
    {name: 'Greg Walker', text: 'Exams Aced ', followers: ' 87'},
    {name: 'Paul Herman', text: 'Exams Aced ', followers: ' 41'}
  ],
  //This is the list of data the program will return to the html page
  items: [
    { data: "Series 9 Exam", location: "San Francisco, CA", pf: "Passed", date: "on 06/30/2015", score: "84/100",color:"true" },
    {  data: "Series 65 Exam", location: "San Francisco, CA", pf: "Failed",date: "on 06/30/2015", score: "50/100" },
    {  data: "Series 8 Exam", location: "San Francisco, CA", pf: "Passed", date: "on 06/30/2015", score: "100/100",color:"green"},
    {imghld: "true"},
    { data: "Series 63 Exam", location: "San Francisco, CA", pf: "Passed", date: "on 06/30/2015", score: "84/100",color:"green" },
    {  data: "Series 7 Exam", location: "San Francisco, CA", pf: "Passed", date: "on 06/30/2015", score: "92/100",color:"green"}
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
Template.exams_taken_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exm_tk-page-selector1': function()
    {
        $(".exm_tk-page-selector1").css("background-color","#3098ff");
        $(".exm_tk-page-selector2").css("background-color","#ffffff");
        $(".exm_tk-page-selector3").css("background-color","#ffffff");
        $(".exm_tk-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exm_tk-page-selector2': function()
    {
        $(".exm_tk-page-selector2").css("background-color","#3098ff");
        $(".exm_tk-page-selector1").css("background-color","#ffffff");
        $(".exm_tk-page-selector3").css("background-color","#ffffff");
        $(".exm_tk-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exm_tk-page-selector3': function()
    {
        $(".exm_tk-page-selector3").css("background-color","#3098ff");
        $(".exm_tk-page-selector2").css("background-color","#ffffff");
        $(".exm_tk-page-selector1").css("background-color","#ffffff");
        $(".exm_tk-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .exm_tk-page-selector200': function()
    {
        $(".exm_tk-page-selector200").css("background-color","#3098ff");
        $(".exm_tk-page-selector2").css("background-color","#ffffff");
        $(".exm_tk-page-selector3").css("background-color","#ffffff");
        $(".exm_tk-page-selector1").css("background-color","#ffffff");
    }
});

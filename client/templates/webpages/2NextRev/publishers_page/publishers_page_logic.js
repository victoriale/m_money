/*
Author: jyothyswaroop
Created: 07/30/2015
Description: publishers_page
Associated Files: publishers_page.less and publishers_page.html
*/
var counter=0;

// renders these data when page opens
Template.publishers_page.onRendered(function () {
$(".publ_pg-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
//gave names for dyamic access {{getheadername}}
Template.publishers_page.helpers({
  getheadername: function(){
    var name= "Robin Meade";
    return name;
  },
    //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "Robin's";
    return name2;
  },
  //gave names for dyamic access {{getheadername3}}
  getheadername3: function(){
    var name3= "Verge";
    return name3;
  },
  //gave names for dyamic access {{getheadername4}}
  getheadername4: function(){
    var name4= "August 8th,1999";
    return name4;
  },
  //gave names for dyamic access {{getheadername5}}
  getheadername5: function(){
    var name5= "author";
    return name5;
  },
  //gave names for dyamic access {{getheadername6}}
  getheadername6: function(){
    var name6= "journalist";
    return name6;
  },
  //gave names for dyamic access {{getheadername7}}
  getheadername7: function(){
    var name7= "579 aricles";
    return name7;
  },
  //image display names access dynamically
  quote:[
    {name: 'Veronica Clyde', text: 'Articles Written: ', text2: ' 1,547'},
    {name: 'Jacob Lofgren', text: 'Articles Written: ', text2: ' 3,456'},
    {name: 'Rebecca Brocksen', text: 'Articles Written:', text2: ' 10,000'},
    {name: 'Matthew Lemon', text: 'Articles Written:', text2: ' 789'},
  ],
  //This is the list of data the program will return to the html page
  items: [
    { counter_no: "1", color: "#f2f2f2", data: "The Verge", location: "New York, NY",  number: "579", stck1: "Author from:", stck2: "08/08/2010 - present", date: "as of 07/30/2015", following: "true" },
    { counter_no: "2", color: "#ffffff", data: "NBC", location: "New York, NY", number: "326",  stck1: "Author from:", stck2: "06/24/2005 - 08/01/2010", date: "as of 07/30/2015" },
    { counter_no: "3", color: "#f2f2f2", data: "CNN", location: "Atlante, GA",  number: "256",  stck1: "Author from:", stck2: "10/31/2000 - 06/24/2005", date: "as of 07/30/2015"},
    {imghld: "true"},
    { counter_no: "4", color: "#f2f2f2", data: "IGN", location: "San Francisco, CA", number: "134",  stck1: "Author from:", stck2: "01/11/1996 - 10/31/2000", date: "as of 07/30/2015", following: "true" },
    { counter_no: "5", color: "#f2f2f2", data: "FOX", location: "New York, NY", number: "105",  stck1: "Author from:", stck2: "03/03/1990 - 01/11/1996", date: "as of 07/30/2015", following: "true"}
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
Template.publishers_page.events({
    //This function is called when user presses the button "1" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .publ_pg-page-selector1': function()
    {
        $(".publ_pg-page-selector1").css("background-color","#3098ff");
        $(".publ_pg-page-selector2").css("background-color","#ffffff");
        $(".publ_pg-page-selector3").css("background-color","#ffffff");
        $(".publ_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "2" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .publ_pg-page-selector2': function()
    {
        $(".publ_pg-page-selector2").css("background-color","#3098ff");
        $(".publ_pg-page-selector1").css("background-color","#ffffff");
        $(".publ_pg-page-selector3").css("background-color","#ffffff");
        $(".publ_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "3" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .publ_pg-page-selector3': function()
    {
        $(".publ_pg-page-selector3").css("background-color","#3098ff");
        $(".publ_pg-page-selector2").css("background-color","#ffffff");
        $(".publ_pg-page-selector1").css("background-color","#ffffff");
        $(".publ_pg-page-selector200").css("background-color","#ffffff");
    },
    //This function is called when user presses the button "200" and the function makes the button background turn
    //blue and make the other buttons background white
    'click .publ_pg-page-selector200': function()
    {
        $(".publ_pg-page-selector200").css("background-color","#3098ff");
        $(".publ_pg-page-selector2").css("background-color","#ffffff");
        $(".publ_pg-page-selector3").css("background-color","#ffffff");
        $(".publ_pg-page-selector1").css("background-color","#ffffff");
    }
});

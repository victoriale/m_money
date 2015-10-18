/*
Author: jyothyswaroop
Created: 10/14/2015
Description: edu_history
Associated Files: edu_history.less and edu_history.html
*/
var counter=0;

//renders the data when page loads
Template.edu_history.onRendered(function () {
$(".edu_his-page-selector1").css("background-color","#3098ff");
  $(".edu_his-page-selector1").css("color","#ffffff");

});

var backgroundStyle="tilewhite";
Template.edu_history.helpers({
  ExecURL: function(){
    var params = Router.current().getParams();
    if(typeof params == 'undefined'){
      return '#';
    }
    return Router.path('content.executiveprofile',{
      exec_id: params.exec_id,
    });
  },
//gave names for dyamic access {{getheadername0}}
    getheadername0: function(){
      var name0= "The United States of America";
      return name0;
    },
//gave names for dyamic access {{getheadername0}}
    getheadername1: function(){
      var name1= "Education History";
      return name1;
    },
//gave names for dyamic access {{getheadername}}
    compname: function(){
      var noof= "Mark Zuckerberg";
      return noof;
    },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name= "Mountain View, CA";
    return name;
  },
  //gave names for dyamic access {{getheadername2}}
  getheadername2: function(){
    var name2= "Harvard University";
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
  //This is the list of data the program will return to the html page
  items: [
    { repo: "Computer Science", data: "Harvard University", location: "Harvard, MA", year: "Attended: 2002 -2004",cir: "true"},
    { repo: "Classics", data: "Phillips Exeter Academy", location: "Exerter, NH", year: "Class of 2002", cir: "true" },
    { repo: "General", data: "Ardsley High School", location: "Ardsley, NY",  year: "Class of 2000"},
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

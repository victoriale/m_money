/*
Author: jyothyswaroop
Created: 08/10/2015
Description: exec_college_rivals page
Associated Files: exec_college_rivals.less and exec_college_rivals.html
*/
var counter=0;
Template.exec_college_rivals.onCreated(function(){
  var data = Session.get('college_rivals');
})
//renders the data when page loads
Template.exec_college_rivals.onRendered(function () {
$(".exr_riva-page-selector1").css("background-color","#3098ff");

});

var backgroundStyle="tilewhite";
Template.exec_college_rivals.helpers({
  //Helper to navigate back to executive profile
  backToExec: function(){
    var params = Router.current().getParams();
    return Router.path('content.executiveprofile', {
      fname: params.fname,
      lname: params.lname,
      ticker: params.ticker,
      exec_id: params.exec_id
    })
  },
//gave names for dyamic access {{getheadername}}
  getheadername: function(){
    var name0= "College Rivals";
    return name0;
  },
//gave names for dyamic access {{getheadername}}
  PageExec: function(){
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    return data['officer']['o_first_name'] + " " + data['officer']['o_last_name'];
  },
  //gave names for dyamic access {{getheadername3}}
  MainRival: function(){
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    return data['rivals'][0]['o_first_name'] + " " + data['rivals'][0]['o_last_name'];
  },
  //gave names for dyamic access cureent date {{getheadername6}}
  RivalDesc: function(){
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    return data['rivals'][0]['o_bio'];
  },
  HeadImg: function(){
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    return data['officer']['o_pic'];
  },

  MainExecUrl: function(){
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    return Router.path('content.executiveprofile',{
      partner_id: '',
      exec_id: data['rivals'][0]['o_id'],
      fname: data['rivals'][0]['o_first_name'],
      lname: data['rivals'][0]['o_last_name'],
      ticker: data['rivals'][0]['c_ticker']
    });
  },

  items: function(){
    var returnArray = [];
    var data = Session.get('college_rivals');
    if(typeof data === 'undefined'){
      return '';
    }
    var i, j;

    for(i = 0; i < data['rivals'].length; i++){
      returnArray[i] = {};
      var rival = data['rivals'][i];
      //After the third iteration, add the Featured Companies, then move to the fourth
      if(i == 3){
        returnArray[i]['imghld'] = true;
        j = i + 1;
      }
      else{
        j = i;
      }

      returnArray[j]['counter_no'] = i + 1;
      returnArray[j]['name'] = rival['o_first_name'] + " " + rival['o_last_name'];
      returnArray[j]['location'] = "";
      returnArray[j]['college'] = rival['education_data'][0]['College'];
      returnArray[j]['desg'] = rival['titles'][0]['title'];
      returnArray[j]['degree'] = rival['education_data'][0]['Degree'];
      returnArray[j]['grp'] = rival['c_name'];
      returnArray[j]['pic'] = rival['o_pic'];
      returnArray[j]['compurl'] = Router.path('content.companyprofile',{
        ticker: rival['c_ticker'],
        name: rival['c_name'],
        partner_id: '',
        company_id: rival['c_id']
      });
      returnArray[j]['execurl'] = Router.path('content.executiveprofile',{
        fname: rival['o_first_name'],
        lname: rival['o_last_name'],
        ticker: rival['c_ticker'],
        partner_id: '',
        exec_id: rival['o_id']
      });
    }

    //if the featured companies haven't been added
    if(returnArray.length < 4){
      returnArray[returnArray.length] = {imghld: true};
    }

    return returnArray;
  },
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

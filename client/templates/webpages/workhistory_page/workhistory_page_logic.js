/* Author: Sri Sindhusha Kuchipudi
** Created: 09/08/2015
** Description: .js file for workhistory_page
** Associated Files: workhistory_page.html, workhistory_page.less, workhistory_page_logic.js
*/

Template.workhistory_page.onCreated( function() {
  this.autorun(function(){
    //take all the data and put all the usable ones into a new array of useable content
    var data = Session.get('work_history');
    //console.log("Initial Data", data);
    if(typeof data != 'undefined'){
      var companies = data.companies;
      if(typeof companies != 'undefined'){
        var projArray = [];
        for (id in companies){
          var compList = companies[id];
          var comp = {};
          comp['location'] = compList['company_data'].c_hq_city + ", " + compList['company_data'].c_hq_state;
          comp['c_name'] = compList['company_data'].c_name;
          comp['c_ticker'] = compList['company_data'].c_ticker;
          comp['c_id'] = compList['company_data'].c_id;
          comp['exec_nearest_pos'] = compList['officer_positions'][0];
          comp['connections'] = compList['connections'];
          comp['o_id'] = data['officer_data'].o_id;
          console.log("Converted Data", comp);
          projArray.push(comp);
        }
        Session.set('new_project_history', projArray);
      }else{
        Session.set('new_project_history', '');
        return '';
      }
    }
  })

});


Template.workhistory_page.onRendered(function () {
$(".wrkh-p_lstpaging_pagcir1").css({"background-color":"#3098ff","color":"#ffffff"});
});
//This function is used to change the color of the clicked button
Template.workhistory_page.events({

    'click .wrkh-p_lstpaging_pagcir1': function()
    {
        $(".wrkh-p_lstpaging_pagcir1").css({"background-color":"#3098ff","color":"#ffffff"});
        $(".wrkh-p_lstpaging_pagcir2").css({"background-color":"#ffffff","color":"#000"});
        $(".wrkh-p_lstpaging_pagcir3").css({"background-color":"#ffffff","color":"#000"});
        $(".wrkh-p_lstpaging_pagoval").css({"background-color":"#ffffff","color":"#000"});
    },

    'click .wrkh-p_lstpaging_pagcir2': function()
    {
      $(".wrkh-p_lstpaging_pagcir2").css({"background-color":"#3098ff","color":"#ffffff"});
      $(".wrkh-p_lstpaging_pagcir1").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagcir3").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagoval").css({"background-color":"#ffffff","color":"#000"});
    },

    'click .wrkh-p_lstpaging_pagcir3': function()
    {
      $(".wrkh-p_lstpaging_pagcir3").css({"background-color":"#3098ff","color":"#ffffff"});
      $(".wrkh-p_lstpaging_pagcir2").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagcir1").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagoval").css({"background-color":"#ffffff","color":"#000"});
    },

    'click .wrkh-p_lstpaging_pagoval': function()
    {
      $(".wrkh-p_lstpaging_pagoval").css({"background-color":"#3098ff","color":"#ffffff"});
      $(".wrkh-p_lstpaging_pagcir2").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagcir3").css({"background-color":"#ffffff","color":"#000"});
      $(".wrkh-p_lstpaging_pagcir1").css({"background-color":"#ffffff","color":"#000"});
    }
});

// these helpers are used to take the data
var backgroundStyle="whitecolor";
Template.workhistory_page.helpers({
  getdtime:function(){
    var datentime="06/24/2015,8:00AM EST";
    return datentime;
  },getlocNm:function(){
    var loc="San Mateo, CA";
    return loc;
  },getWrkdetails:function(){
      var wrk="Work & Project History";
      return wrk;
    },getName:function(){
      var Nm="Mark Zuckerberg";
      return Nm;
    },getorgNm:function(){
      var OrgNm="Internet.Org";
      return OrgNm;
    },
    getdate:function()
    {
      var dat="07/29/2015";
      return dat;
    },
    listings: [
    {  listno:"1", location: "Palo Alto, CA", wrkNam: "Internet.Org", position: "Founder", strdate: "August 2013",enddate:"present",  numofmonths: "1 year & 9 months"},
    {  listno:"2", location: "Melno Park, CA", wrkNam: "Facebook, Inc.", position: "Cheif Executive Officer", strdate: "Febraury 2001",enddate:" present",  numofmonths: "12 year & 1 month"},
    {  listno:"3", location: "Palo Alto, CA", wrkNam: "Wirehog", position: "Co-founder", strdate: "October 2004",enddate:"2006",  numofmonths: "1 year & 2 months"},
    {  listno:"4", location: "Melno Park, CA", wrkNam: "Best Buy", position: "Sales Rep", strdate: "November 2002",enddate:"December 2003",  numofmonths: "1 year & 1 month"},
    {  listno:"3", location: "Palo Alto, CA", wrkNam: "McDonalds", position: "Cashier", strdate: "June 2000",enddate:"2002",  numofmonths: "1 year"},
],
//this is used to change the color of the background
getBackgroundStyle: function() {
  if (backgroundStyle === "greycolor")
  {
    backgroundStyle="whitecolor";
    return backgroundStyle;
  } else {
    backgroundStyle = "greycolor";
    return backgroundStyle;
    }
  }
});

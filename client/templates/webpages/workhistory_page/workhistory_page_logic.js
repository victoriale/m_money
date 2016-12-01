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
          comp['locurl'] = Router.pick_path('content.locationprofile',{
            loc_id:compUrlName(compList['company_data'].c_hq_state),
            city:compUrlName(compList['company_data'].c_hq_city)
          });
          comp['boardurl'] = Router.pick_path('content.boardcommittee',{
            ticker:compList['company_data'].c_ticker,
            name:compUrlName(compList['company_data'].c_name),
            company_id:compList['company_data'].c_id
          });
          comp['compurl'] = Router.pick_path('content.companyprofile',{
            ticker:compList['company_data'].c_ticker,
            name:compUrlName(compList['company_data'].c_name),
            company_id:compList['company_data'].c_id
          });
          comp['execurl'] = Router.pick_path('content.executiveprofile',{
            ticker:compList['company_data'].c_ticker,
            name:compUrlName(compList['company_data'].c_name),
            company_id:compList['company_data'].c_id
          });
          comp['location'] = compList['company_data'].c_hq_city + ", " + compList['company_data'].c_hq_state;
          comp['c_name'] = compList['company_data'].c_name;
          comp['c_ticker'] = compList['company_data'].c_ticker;
          comp['c_id'] = compList['company_data'].c_id;
          comp['c_logo'] = compList['company_data'].c_logo;
          comp['exec_nearest_pos'] = compList['officer_positions'][0];
          comp['connections'] = compList['connections'];
          comp['o_id'] = data['officer_data'].o_id;
          comp['c_last_updated'] = (new Date(compList['company_data'].c_tr_last_updated)).toSNTForm();
          comp['c_desc'] = compList['company_data'].c_desc;
          projArray.push(comp);
        }
        Session.set('new_work_history', projArray);
      }else{
        Session.set('new_work_history', '');
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
    },
    'click .wrkh-p_srtbr_srtcon_srthead_srtheadcross': function()
    {
      $(".wrkh-p_srtbr").css({"display":"none"});
    }
});

// these helpers are used to take the data
var backgroundStyle="whitecolor";
Template.workhistory_page.helpers({
  geturl:function(){
    var params = Router.current().getParams();
    if(typeof params =='undefined'){
      return '';
    }
    return Router.pick_path('content.executiveprofile',{
      lname:params.lname,
      fname:params.fname,
      ticker:params.ticker,
      exec_id: params.exec_id,
    });
  },
  getdtime:function(){
    var data = Session.get('work_history');
    var date = (new Date(data['officer_data']['o_last_updated'])).toSNTFormTime();
    return date;
  },
  getlocNm:function(){
    var data = Session.get('new_work_history');
    var currentComp = data[data.length - 1];
    return currentComp['location'];
  },
  getlocurl:function(){
    var data = Session.get('new_work_history');
    var currentComp = data[data.length - 1];
    return currentComp['locurl'];
  },
  getWrkdetails:function(){
      var wrk="Work & Project History";
      return wrk;
    },getName:function(){
      var data = Session.get('work_history');
      var name = data['officer_data']['o_first_name'] + " " + data['officer_data']['o_last_name'];
      return name;
    },getorgNm:function(){
      var data = Session.get('new_work_history');
      var currentComp = data[data.length - 1];
      return currentComp['c_name'];
    },
    getdate:function()
    {
      var data = Session.get('new_work_history');
      var currentComp = data[data.length - 1];
      return currentComp['c_last_updated'];
    },
    getDesc:function(){
      var data = Session.get('new_work_history');
      var currentComp = data[data.length - 1];
      return currentComp['c_desc'];
    },
    getPic:function(){
      var data = Session.get('work_history');
      var url = data['officer_data']['o_pic'];
      return url;
    },
    getExecUrl:function(){
      var params = Router.current().getParams();
      var url = Router.pick_path('content.executiveprofile',{
        fname:params.fname,
        lname:params.lname,
        ticker:params.ticker,
        exec_id:params.exec_id
      });
      return url;
    },
//     listings: [
//     {  listno:"1", location: "Palo Alto, CA", wrkNam: "Internet.Org", position: "Founder", strdate: "August 2013",enddate:"present",  numofmonths: "1 year & 9 months"},
//     {  listno:"2", location: "Melno Park, CA", wrkNam: "Facebook, Inc.", position: "Cheif Executive Officer", strdate: "Febraury 2001",enddate:" present",  numofmonths: "12 year & 1 month"},
//     {  listno:"3", location: "Palo Alto, CA", wrkNam: "Wirehog", position: "Co-founder", strdate: "October 2004",enddate:"2006",  numofmonths: "1 year & 2 months"},
//     {  listno:"4", location: "Melno Park, CA", wrkNam: "Best Buy", position: "Sales Rep", strdate: "November 2002",enddate:"December 2003",  numofmonths: "1 year & 1 month"},
//     {  listno:"3", location: "Palo Alto, CA", wrkNam: "McDonalds", position: "Cashier", strdate: "June 2000",enddate:"2002",  numofmonths: "1 year"},
// ],
    listings:function(){
      var returnArray = [];
      var i, j, numMonths, numYears;
      var data = Session.get('new_work_history');
      var data2 = Session.get('work_history');
      var exec = data2['officer_data'];

      var month = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

      for(i = 0; i < data.length; i++){
        returnArray[i] = {};
        var company = data[i];
        returnArray[i]['listno'] = i;
        returnArray[i]['location'] = company['location'];
        returnArray[i]['locurl'] = company['locurl'];
        returnArray[i]['compurl'] = company['compurl'];
        returnArray[i]['boardurl'] = company['boardurl'];
        returnArray[i]['c_logo'] = company['c_logo'];
        returnArray[i]['wrkNam'] = company['c_name'];
        returnArray[i]['position'] = company['exec_nearest_pos']['Title'];
        returnArray[i]['execPic'] = exec['o_pic'];

        //Start and end dates
        returnArray[i]['strdate'] = month[company['exec_nearest_pos']['start_month'] - 1] + " " + company['exec_nearest_pos']['start_year'];
        if(company['exec_nearest_pos']['end_month'] == undefined){
          if(company['exec_nearest_pos']['end_year'] == undefined){
            returnArray[i]['enddate'] = "present";
          }
          else{
            returnArray[i]['enddate'] = company['exec_nearest_pos']['end_year'];
          }
        }
        else{
          returnArray[i]['enddate'] = month[company['exec_nearest_pos']['end_month'] - 1] + " " + company['exec_nearest_pos']['end_year']
        }

        //Calculate number of years
        if(company['exec_nearest_pos']['end_year'] == undefined){
          var currentYear = new Date().getFullYear();
          numYears = currentYear - company['exec_nearest_pos']['start_year'];
        }
        else{
          numYears = company['exec_nearest_pos']['end_year'] - company['exec_nearest_pos']['start_year']
        }

        //Calculate months
        if(returnArray[i]['enddate'] == "present"){
          var currentMonth = new Date().getMonth() + 1;
          numMonths = currentMonth - company['exec_nearest_pos']['start_month'];
        }
        else if(company['exec_nearest_pos']['end_month'] == undefined){
          numMonths = 0;
        }
        else{
          numMonths = company['exec_nearest_pos']['end_month'] - company['exec_nearest_pos']['start_month'];
        }

        if(numMonths < 0){
          numMonths = numMonths + 12;
          numYears = numYears - 1;
        }

        var timeString = "";
        if(numYears > 0){
          timeString += numYears.toString() + " years";
          if(numMonths > 0){
            timeString += " & " + numMonths.toString() + " months";
          }
        }
        else{
          timeString += numMonths.toString() + " months";
        }
        returnArray[i]['numofmonths'] = timeString;
      }

      return returnArray;
    },

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

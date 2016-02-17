var Future = Npm.require("fibers/future");
var report_name_env = new Meteor.EnvironmentVariable;
var curTime = new Meteor.EnvironmentVariable;
var curcomp_id = new Meteor.EnvironmentVariable;
var curloc_id = new Meteor.EnvironmentVariable;
var firstTime = new Meteor.EnvironmentVariable;

var callUrl = "http://apifin.investkit.com/call_controller.php";

Meteor.methods({
  GetProfileData: function(profile, batchNum, state, city){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Company Request",company_id,batchNum);

    var UrlString = callUrl + "?action="+profile+"&option="+batchNum+"&param="+state;

    if(typeof city != 'undefined' && city != null){
      UrlString += ","+city;
    }
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, batchNum, state, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetProfileData - Error","' + batchNum + '","' + state + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetProfileData","' + batchNum + '","' + state + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined,startTime,batchNum,state));

    this.unblock();
    return future.wait();
  },

  GetCompanyData: function(company_id, batchNum) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Company Request",company_id,batchNum);

    var UrlString = callUrl + "?action=company_profile&option="+batchNum+"&param="+company_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, batchNum, company_id, error, data){
      if ( error ) {
        future.throw(error);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetCompanyData - HTTP Error","' + batchNum + '","' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }

      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetCompanyData - Parse Error","' + batchNum + '","' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetCompanyData","' + batchNum + '","' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, batchNum, company_id));

    this.unblock();
    return future.wait();
  },
  GetLocationPage: function(loc_id, option, page) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Location Request",loc_id);
    if(loc_id === 'National'){
      // console.log('national call');
      var UrlString = callUrl + "?action=location_page&option="+option;
    }else if(isNaN(loc_id) && loc_id.indexOf('.') == -1){
      var UrlString = callUrl + "?action=location_page&option="+option+"&state="+loc_id;
    }else if(isNaN(loc_id)){
      var UrlString = callUrl + "?action=location_page&option="+option+"&partner_domain="+loc_id;
    }else{
      var UrlString = callUrl + "?action=location_page&option="+option+"&dma="+loc_id;
    }
    if(typeof page != 'undefined' || page != null){
      UrlString += "&page="+page;
    }
    console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, option, loc_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetLocationPage - Error","' + option + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetLocationPage","' + option + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined,startTime,option,loc_id));

    this.unblock();
    return future.wait();
  },
  GetLocationData: function(loc_id, batchNum) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    if ( typeof loc_id == "undefined" || loc_id == null || loc_id == 'null') {
      throw new Error(404,"Null Location ID");
    }
    // console.log("New Company Request",loc_id,batchNum);
    if(loc_id === 'National'){
      // console.log('national call');
      var UrlString = callUrl + "?action=location_profile&option="+batchNum;
    }else if(isNaN(loc_id)){
      var UrlString = callUrl + "?action=location_profile&option="+batchNum+"&state="+loc_id;
    }else{
      var UrlString = callUrl + "?action=location_profile&option="+batchNum+"&dma="+loc_id;
    }
    // console.log(UrlString);

    curloc_id.withValue(batchNum, function(){
      Meteor.http.get(UrlString, Meteor.bindEnvironment((function(startTime,batchNum,loc_id,error, data){
        if ( error ) {
          future.throw(error);
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"GetLocationData - HTTP Error","' + batchNum + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        }
        data.content = data.content.toString().replace(/^[^{]*/,function(a){ return ''; });
        var batch = curloc_id.get();
        try{
          data = JSON.parse(data['content']);
        } catch (e) {
          future.throw(e);
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"GetLocationData - Parse Error","' + batchNum + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        }
        future.return(data);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetLocationData","' + batchNum + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
      }).bind(undefined,startTime,batchNum,loc_id)));
    });

    this.unblock();
    return future.wait();
  },

  GetExecData: function(exec_id, batchNum) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Executive Request",exec_id,batchNum);

    var UrlString = callUrl + "?action=executive_profile&option="+batchNum+"&param="+exec_id;
     console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime,batchNum,exec_id, error, data){
      if ( error ) {
        future.throw(error);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetExecData - HTTP Error","' + batchNum + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      data.content = data.content.toString().replace(/^[^{]*/,function(a){ return ''; });
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetExecData - Parse Error","' + batchNum + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetExecData","' + batchNum + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
      future.return(data);
    }).bind(undefined,startTime,batchNum,exec_id));

    this.unblock();
    return future.wait();
  },

  CompWebPageData: function(comp_id, option){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New company Request",comp_id);

    var UrlString =   callUrl + "?action=company_page&option=" + option + "&param=" + comp_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, option, comp_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"CompWebPageData - Error","' + option + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"CompWebPageData","' + option + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, option, comp_id));

    this.unblock();
    return future.wait();
  },

  ExecWebpageData: function(exec_id, option) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New CollegeRivals Request",exec_id,option);

    var UrlString = callUrl + "?action=executive_page&option="+ option +"&param=" + exec_id;

    Meteor.http.get(UrlString, (function(startTime, option, exec_id, error, data){
      try{
        data.content = data.content.toString().replace(/^[^{]*/,function(a){ return ''; });
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"ExecWebpageData - Error","' + option + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"ExecWebpageData","' + option + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, option, exec_id));

    this.unblock();
    return future.wait();
  },

  WhosWhoIndie: function(comp_id, page) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Executive Request",comp_id);

    var UrlString =   callUrl + "?action="+page+"&option=about&param=" + comp_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, page, comp_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"WhosWhoIndie - Error","' + page + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"WhosWhoIndie","' + page + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, page, comp_id));

    this.unblock();
    return future.wait();
  },

  CompIndie: function(comp_id, call) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Executive Request",comp_id);

    var UrlString =   callUrl + "?action=company_profile&option=indie&call="+call+"&param=" + comp_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, call, comp_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"CompIndie - Error","' + call + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"CompIndie","' + call + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, call, comp_id));

    this.unblock();
    return future.wait();
  },

  ExecIndie: function(exec_id, call) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Executive Request",comp_id);

    var UrlString =   callUrl + "?action=executive_profile&option=indie&call="+call+"&param=" + exec_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, call, exec_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"ExecIndie - Error","' + call + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"ExecIndie","' + call + '","' + exec_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, call, exec_id));

    this.unblock();
    return future.wait();
  },

  EarningsReport: function(comp_id, report_name) {
    // Housekeeping
    this.unblock();
    var future = new Future();
    var startTime = (new Date()).getTime();

    var UrlString = callUrl + "?action=company_profile&option=indie&call=earnings&param=" + comp_id; // Create URL string

    report_name_env.withValue(report_name,function(){ // Save report name
      var callback = Meteor.bindEnvironment((function(error, data){ // Provide report name to callback
        if ( error ) { // Error handling
          future.throw(500,error);
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"EarningsReport - HTTP Error","' + report_name + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        }
        try {
          var match = "";
          var nomatch = true;
          if ( report_name_env.get().match(/Annual-Income-Statement/) ) {
            match = /Annual Income Statement/;
            nomatch = false;
          } else if ( report_name_env.get().match(/Income-Statement/) ) {
            match = /Income Statement/;
          } else if ( report_name_env.get().match(/Annual-Balance-Sheet/) ) {
            match = /Annual Balance Sheet/;
            nomatch = false;
          } else if ( report_name_env.get().match(/Annual-Cash-Flow-Statement/) ) {
            match = /Annual Cash Flow Statement/;
            nomatch = false;
          } else if ( report_name_env.get().match(/Balance-Sheet/) ) {
            match = /Balance Sheet/;
          } else if ( report_name_env.get().match(/Cash-Flow-Statement/) ) {
            match = /Cash Flow Statement/;
          }
          if ( match == "" ) {
            future.return({success: false, message: 'Invalid Earnings Report'});
            var endTime = (new Date()).getTime();
            console.log('METHODSTAT|"EarningsReport - Invalid","' + report_name + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
            return false;
          }
          data = JSON.parse(data['content']);
          var retData = [];
          for ( var index = 0; index < data.earnings.length; index++ ) { // Find the correct report
            if ( data.earnings[index].e_report_title.match(match) && !(nomatch && data.earnings[index].e_report_title.match(/Annual/)) ) {
              retData[retData.length] = data.earnings[index];
            }
          }
          if ( retData.length == 0 ) {
            future.return({success: false, message: 'Earnings Report Not Found'});
            var endTime = (new Date()).getTime();
            console.log('METHODSTAT|"EarningsReport - No Data","' + report_name + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
            return false;
          }

          future.return({success: true, data: retData});
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"EarningsReport","' + report_name + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        } catch(e) { // Error handling (usually parsing)
          // console.log('Exception',e);
          future.throw(499,e);
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"EarningsReport - Error","' + report_name + '","' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        }
      }).bind(undefined, startTime, report_name, comp_id));

      Meteor.http.get(UrlString,callback);
    });

    return future.wait();
  },

  //Get daily update data for one day
  GetOneDayDailyUpdate: function(loc_id, type){
    var future = new Future();
    var startTime = (new Date()).getTime();

    //Builds the parameters
    switch(type){
      //If case is normal, determine if dma (number) or state (string) is the parameter
      case 'normal':
        if(isNaN(loc_id)){
          if(loc_id === 'National'){
            var param = undefined;
          }else{
            var param = '&state=' + loc_id;
          }
        }else{
          var param = '&dma=' + loc_id;
        }
      break;
      //If case is partner, use param=partner_domain
      case 'partner':
        var param = '&partner_domain=' + loc_id;
      break;
    }

    //console.log('param', param);
    if(typeof param !== 'undefined'){
      var UrlString = callUrl + "?action=location_profile&option=indie&call=one_day_location_daily_update" + param;
    }else{
      var UrlString = callUrl + "?action=location_profile&option=indie&call=one_day_location_daily_update";
    }

    //console.log('ONE DAY DAILY URL', UrlString);

    Meteor.http.get(UrlString, (function(startTime, loc_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"OneDayDailyUpdate - Error",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"OneDayDailyUpdate",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, loc_id))

    this.unblock();
    return future.wait();
  },

  GetMoneyMemoryData: function(company_id, initial_investment, start_date, end_date){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("Money Memory Request",company_id, initial_investment, start_date, end_date);

    var UrlString = callUrl + "?action=company_profile&option=indie&call=money_memory&param=" + company_id + "&mmem=" + initial_investment + "," + end_date + "," + start_date;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, company_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetMoneyMemoryData - Error",,"' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetMoneyMemoryData",,"' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, company_id))

    this.unblock();
    return future.wait();
  },

  CompEarningsIndie: function(comp_id){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Executive Request",comp_id);

    //var UrlString =   callUrl + "?action=company_profile&option=indie&call=earnings&param=FB";
    var UrlString =   callUrl + "?action=company_profile&option=indie&call=earnings&param=" + comp_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, comp_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"CompEarningsIndie - Error",,"' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"CompEarningsIndie",,"' + comp_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, comp_id));

    this.unblock();
    return future.wait();
  },

  statisticsData: function(loc_id){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Statistics Data",loc_id);

    //random number to pick random list in list_index that's in database
    //param={list_index} , {location/DMA}
    if ( loc_id.indexOf('.') == -1 ) {
      var UrlString = callUrl + "?action=location_page&option=statistics&state="+ loc_id;
    } else {
      var UrlString = callUrl + "?action=location_page&option=statistics&partner_domain="+ loc_id;
    }
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, loc_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"statisticsData - Error",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"statisticsData",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, loc_id));

    this.unblock();
    return future.wait();
  },

  sectorData: function(loc_id, sector, page){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Sector Data",loc_id);

    //Special case (Quick Fix to handle the / in this parameter)
    if(sector === 'Consumer Non Cyclical'){
      sector = 'Consumer/Non-Cyclical';
    }

    //random number to pick random list in list_index that's in database
    console.log(loc_id, sector);
    if(loc_id === 'National'){
      // console.log('national call');
      var UrlString = callUrl + "?action=location_page&option=sector_companies";
    }else if(isNaN(loc_id) && loc_id.indexOf('.') == -1){
      var UrlString = callUrl + "?action=location_page&option=sector_companies&state="+ loc_id;
    }else if(isNaN(loc_id)){
      var UrlString = callUrl + "?action=location_page&option=sector_companies&partner_domain="+ loc_id;
    }else{
      var UrlString = callUrl + "?action=location_page&option=sector_companies&dma="+ loc_id;
    }

    if(sector != null && typeof sector != 'undefined' && sector != ''){
      UrlString +="&param="+encodeURIComponent(sector);
    }
    if ( typeof page == "number" ) {
      UrlString += "&page=" + page + "&per_page=100";
    } else {
      UrlString += "&page=1&per_page=100";
    }
    console.log(UrlString);
    Meteor.http.get(UrlString, (function(startTime, sector, loc_id, error, data){
      try{
        data.content = data.content.toString().replace(/^[^{]*/,function(a){ return ''; });
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"sectorData - Error","' + sector + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"sectorData","' + sector + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, sector, loc_id));

    this.unblock();
    return future.wait();
  },

  featuredData: function(loc_id){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New featured List Request",loc_id);

    //random number to pick random list in list_index that's in database
    var x = Math.floor((Math.random() * 2) + 1);
    //param={list_index} , {location/DMA}
    var UrlString = callUrl + "?action=top_list&option=list&param="+ x +","+ loc_id
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, loc_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"featuredData - Error",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"featuredData",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, loc_id));

    this.unblock();
    return future.wait();
  },

  listData: function(id){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New featured List Request",id);

    //random number to pick random list in list_index that's in database
    var x = Math.floor((Math.random() * 2) + 1);
    //param={list_index} , {location/DMA}
    var UrlString = callUrl + "?action=company_profile&option=batch_3&param="+id+"&limit=1,3";
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"listData - Error",,"' + id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"listData",,"' + id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, id));

    this.unblock();
    return future.wait();
  },

  topListData: function(index ,loc_id, page){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New featured List Request",loc_id);
    // console.log("List Index:",index);

    //random number to pick random list in list_index that's in database
    var x = Math.floor((Math.random() * 2) + 1);
    //param={list_index} , {location/DMA}
    // console.log('testing:',index);
    if(index == 'sv150_losers' || index == 'sv150_gainers' || index == 'female_ceo' || index == 'dollar_ceo'){
      var UrlString = callUrl + "?action=top_list&option="+index;
    }else if(loc_id === null || typeof loc_id == "undefined"){
      var UrlString = callUrl + "?action=top_list&option=list&param="+index;
    }else{
      var UrlString = callUrl + "?action=top_list&option=list&param="+index+","+loc_id;
    }
    if(typeof page != 'undefined' || page != null){
      UrlString += "&page="+page;
    }
    console.log("CALLIN NEW LIST:",UrlString);
    Meteor.http.get(UrlString, (function(startTime, index, loc_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"topListData - Error","' + index + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"topListData","' + index + '","' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, index, loc_id));

    this.unblock();
    return future.wait();
  },

  listOfListLoc:function(loc_id, page){
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New featured List Request",loc_id);

    //random number to pick random list in list_index that's in database
    //param={list_index} , {location/DMA}
    //http://testapi.investkit.com:90/call_controller.php?action=location_page&option=list_of_lists&state=KS&page=2&per_page=10  <= TEST

    //http://apifin.investkit.com/call_controller.php?action=location_page&option=list_of_lists  <= LIVE
    if(loc_id == "National" || loc_id == ''){
      var UrlString = callUrl + "?action=location_page&option=list_of_lists";
    }else if(isNaN(loc_id) && loc_id.indexOf('.') == -1){
      var UrlString = callUrl + "?action=location_page&option=list_of_lists&state="+loc_id;
    }else if(isNaN(loc_id)){
      var UrlString = callUrl + "?action=location_page&option=list_of_lists&partner_domain="+loc_id;
    }else{
      var UrlString = callUrl + "?action=location_page&option=list_of_lists&dma="+loc_id;
    }
    if ( typeof page != "undefined" ) {
      UrlString += "&page=" + page + "&per_page=20";
      console.log('listpageloc');
    }
     console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, loc_id, error, data){
      try{
        data.content = data.content.toString().replace(/^[^{]*/,function(a){ return ''; });
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"listOfListLoc - Error",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"listOfListLoc",,"' + loc_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, loc_id));

    this.unblock();
    return future.wait();
  },

  //AI CONTENT METEOR CALL
  GetAIContent: function(comp_id){
    this.unblock();
    var URL = "http://dev-finance-ai.synapsys.us:90/API_AI_FIN.php?call=company&id=" + comp_id;
    // console.log(URL);
    var future = new Future();
    curTime.withValue((new Date()).getTime(),function(){
      curcomp_id.withValue(comp_id,function(){
        var callback1 = Meteor.bindEnvironment(function(error, data){
          if ( error ) {
            future.return(error.content);
            // console.log("error");
            return false;
          }
          future.return(data.content);
        });
        Meteor.http.get(URL, callback1);
      });
    });
    return future.wait();
  },

  //AI CONTENT METEOR CALL
  GetAIContent2: function(state, city){
    this.unblock();
    var URL = "http://apifin.investkit.com/yseop/yseop-location-class.php?state=" + state;
    var loc_id = state;
    if(typeof city != 'undefined' && city != null){
      URL += "&city="+ city;
      loc_id += ","+city;
    }
    var future = new Future();
    curTime.withValue((new Date()).getTime(),function(){
      curloc_id.withValue(loc_id,function(){
        var callback1 = Meteor.bindEnvironment(function(error, data){
          if ( error ) {
            future.return(error.content);
            // console.log("error");
            return false;
          }
          var URL = "http://publisher.synapsys.us:8080/yseop-manager/direct/snt-fin/dialog.do";
          var UN = "client";
          var PW = "123";
          var info = data.content;
          firstTime.withValue(Math.round(((new Date()).getTime() - curTime.get())/100)/10,function(){
            curTime.withValue((new Date()).getTime(),function(){
              var callback2 = Meteor.bindEnvironment(function(error,data){
                if ( error ) {
                  future.return(data);
                  console.log("SNTAI|\"" + curloc_id.get() + "\",\"" + (new Date()).getTime() + "\",\"" + firstTime.get() + "\",\"" + (Math.round(((new Date()).getTime() - curTime.get())/100)/10) + "\",\"ERROR\"|");
                  return false;
                }
                console.log("SNTAI|\"" + curloc_id.get() + "\",\"" + (new Date()).getTime() + "\",\"" + firstTime.get() + "\",\"" + (Math.round(((new Date()).getTime() - curTime.get())/100)/10) + "\",\"SUCCESS\"|");
                future.return(data.content);
              });
              Meteor.http.post(URL,{
                auth: UN+":"+PW,
                params: {xml: info}
              },callback2);
            });
          });
        });
        Meteor.http.get(URL,callback1);
      });
    });
    return future.wait();
  },

  GetPartnerHeader: function(partner_id) {
    var startTime = (new Date()).getTime();
    var URLString = "http://apireal.synapsys.us/listhuv/?action=get_partner_data&domain=" + partner_id;
    var future = new Future();
    Meteor.http.get(URLString,(function(startTime, partner_id, error,data){
      if ( error ) {
        future.return(error);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetPartnerHeader",,"' + partner_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetPartnerHeader",,"' + partner_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, partner_id));
    this.unblock();
    return future.wait();
  },

  GetPartnerProfile: function(partner_id, batch) {
    var future = new Future();
    var startTime = (new Date()).getTime();
    // console.log("New Partner Request",partner_id,batch);

    var UrlString = callUrl + "?action=location_profile&option="+batch+"&partner_domain="+partner_id;
    // console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, batch, partner_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetPartnerProfile - Error","' + batch + '","' + partner_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetPartnerProfile","' + batch + '","' + partner_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, batch, partner_id));

    this.unblock();
    return future.wait();
  },

  GetSuggestion: function(searchString,currentTime){
    var startTime = (new Date()).getTime();
    var stringURL = callUrl + "?action=search&option=batch&wild=true&param=" + searchString;
    var future = new Future();
    curTime.withValue(currentTime,function(){
      var boundFunction = Meteor.bindEnvironment((function(startTime, searchString, error, data){
        if ( error ) {
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"GetSuggestion - HTTP Error",,"' + searchString + '",' + (endTime - startTime) + ',' + endTime + '|');
          future.throw(error);
          return false;
        }

        try {
          data = JSON.parse(data['content']);
        } catch(e) {
          future.throw(e);
          var endTime = (new Date()).getTime();
          console.log('METHODSTAT|"GetSuggestion - Parse Error",,"' + searchString + '",' + (endTime - startTime) + ',' + endTime + '|');
          return false;
        }
        var nowTime = curTime.get();

        future.return({data: data, time: nowTime});
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetSuggestion",,"' + searchString + '",' + (endTime - startTime) + ',' + endTime + '|');
      }).bind(undefined, startTime, encodeURIComponent(searchString)));
      Meteor.http.get(stringURL,boundFunction);
    });
    this.unblock();
    return future.wait();
  },

  listOfListData: function(company_id, page){
    var future = new Future();
    var startTime = (new Date()).getTime();
    var UrlString = callUrl + "?action=company_profile&option=indie&call=list_of_lists&param=" + company_id + "&limit=1,10";

    if ( typeof page != "undefined" ) {
      UrlString += "&page=" + page;
    }
    console.log(UrlString);

    Meteor.http.get(UrlString, (function(startTime, company_id, error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"listOfListData - Error",,"' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      future.return(data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"listOfListData",,"' + company_id + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, company_id));

    this.unblock();
    return future.wait();
  },


  GetDirectoryData: function(pageNum, type, query){
    var startTime = (new Date()).getTime();
    if(query === null){
      var URLString = callUrl + "?action=global_page&option=directory&page=" + pageNum + '&type=' + type;
    }else{
      var URLString = callUrl + "?action=global_page&option=directory&page=" + pageNum + '&type=' + type + query;
    }

    // console.log('Directory URL', URLString);

    var future = new Future();
    Meteor.http.get(URLString, (function(startTime, type, pageNum, error, data){
      //Error Code
      if( error ){
        future.return(error);
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetDirectoryData - Error","' + pageNum + '","' + type + '",' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }
      //Success Code
      future.return(data.data);
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetDirectoryData","' + pageNum + '","' + type + '",' + (endTime - startTime) + ',' + endTime + '|');
    }).bind(undefined, startTime, type, pageNum));
    this.unblock();
    return future.wait();
  },

  // Method to get data for the list for the dynamic widget
  GetWidgetData: function(tw, sw, input) {
    // Inputs: tw - trigger word, sw - sort parameter, input - input value
    // If value is not needed, pass -1
    var api_url = "http://dw.synapsys.us/list_creator_api.php";

    // Return error if no tw
    if ( typeof(tw) == "undefined" ) {
      return {
        "success": false,
        "message": "Error: Trigger word is required"
      };
    }

    // Set defaults
    if ( typeof(sw) == "undefined" ) {
      sw = -1;
    }
    if ( typeof(input) == "undefined" ) {
      input = -1;
    }

    // Start the timer
    var startTime = (new Date()).getTime();

    // Build the URL
    var url = api_url + "?tw=" + tw + "&sw=" + sw + "&input=" + input;

    // Build a key for logging
    var key = tw + ":" + sw + ":" + input;

    // Options array (unzip gzip response)
    var opts = {
      npmRequestOptions: {
        gzip: true
      }
    };

    // Make the API call
    var future = new Future();
    HTTP.call('GET', url, opts, (function(startTime, key, error, data){
      // Error handling
      if ( error ) {
        future.return(error); // Return the error
        // Logging
        var endTime = (new Date()).getTime();
        console.log('METHODSTAT|"GetWidgetData - Error","' + key + '",,' + (endTime - startTime) + ',' + endTime + '|');
        return false;
      }

      // Handle success
      future.return(data.data);

      // Logging
      var endTime = (new Date()).getTime();
      console.log('METHODSTAT|"GetWidgetData","' + key + '","' + data.headers['snt-served-by'] + "-" + data.headers['snt-cached-response'] + '",' + (endTime - startTime) + ',' + endTime + '|');
      return false;
    }).bind(undefined, startTime, key));
    this.unblock();

    // Return the future wait
    return future.wait();
  }

});

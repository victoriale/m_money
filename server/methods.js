var Future = Npm.require("fibers/future");
var report_name_env = new Meteor.EnvironmentVariable;

Meteor.methods({
  GetCompanyData: function(company_id, batchNum) {
    console.log("New Company Request",company_id,batchNum);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option="+batchNum+"&param="+company_id;
    console.log(UrlString);

    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },

  GetExecData: function(exec_id, batchNum) {
    console.log("New Executive Request",exec_id,batchNum);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=executive_profile&option="+batchNum+"&param="+exec_id;
    console.log(UrlString);

    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },

  WhosWhoIndie: function(comp_id) {
    console.log("New Executive Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=whos_who&param=FB";
    //var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=whos_who&param=" + comp_id;
    console.log(UrlString);

    var data = HTTP.call("GET",UrlString);
    try {
      data = JSON.parse(data['content']);
    } catch(e) {
      console.log("Exception");
      data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
      data = JSON.parse(data['content']);
    }
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
  },

  EarningsReport: function(comp_id, report_name) {
    // Housekeeping
    this.unblock();
    var future = new Future();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=earnings&param=" + comp_id; // Create URL string

    report_name_env.withValue(report_name,function(){ // Save report name
      var callback = Meteor.bindEnvironment(function(error, data){ // Provide report name to callback
        if ( error ) { // Error handling
          future.throw(500,error);
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
            return false;
          }

          future.return({success: true, data: retData});
          return false;
        } catch(e) { // Error handling (usually parsing)
          console.log('Exception',e);
          future.throw(499,e);
          return false;
        }
      });

      Meteor.http.get(UrlString,callback);
    });

    return future.wait();
  },

GetMoneyMemoryData: function(company_id, initial_investment, start_date, end_date){
  console.log("Money Memory Request",company_id, initial_investment, start_date, end_date);
  var Start = new Date();
  Start = Start.getTime();
  var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=money_memory&param=" + company_id + "&mmem=" + initial_investment + "," + end_date + "," + start_date;
  console.log(UrlString);

  var data = HTTP.call("GET",UrlString);
  try {
    data = JSON.parse(data['content']);
  } catch(e) {
    console.log("Exception");
    data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
    data = JSON.parse(data['content']);
  }
  var End = new Date();
  End = End.getTime();
  var TimeDif = (End - Start)/1000;
  console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    return data;
},

CollegeRivalsData: function(exec_id, option) {
  console.log("New CollegeRivals Request",exec_id,option);
  var Start = new Date();
  Start = Start.getTime();

  var UrlString = "http://apifin.synapsys.us/call_controller.php?action=executive_page&option="+ option +"&param=" + exec_id;
  console.log(UrlString);

  var data = HTTP.call("GET",UrlString);
  try {
    data = JSON.parse(data['content']);
  } catch(e) {
    console.log("Exception");
    data['content'] = data['content'].toString().replace(/^[^\{]*/,'');
    data = JSON.parse(data['content']);
  }
  var End = new Date();
  End = End.getTime();
  var TimeDif = (End - Start)/1000;
  console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
  return data;
},

});

Meteor.startup(function(){
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /');
});
 

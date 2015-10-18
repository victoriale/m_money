var Future = Npm.require("fibers/future");
var report_name_env = new Meteor.EnvironmentVariable;
var curTime = new Meteor.EnvironmentVariable;
var curcomp_id = new Meteor.EnvironmentVariable;
var firstTime = new Meteor.EnvironmentVariable;

Meteor.methods({
  GetCompanyData: function(company_id, batchNum) {
    var future = new Future();
    console.log("New Company Request",company_id,batchNum);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option="+batchNum+"&param="+company_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  GetExecData: function(exec_id, batchNum) {
    var future = new Future();
    console.log("New Executive Request",exec_id,batchNum);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=executive_profile&option="+batchNum+"&param="+exec_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  WhosWhoIndie: function(comp_id) {
    var future = new Future();
    console.log("New Executive Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=executive_page&option=about&param=" + comp_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  CompIndie: function(comp_id, call) {
    var future = new Future();
    console.log("New Executive Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call="+call+"&param=" + comp_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  ExecIndie: function(comp_id, call) {
    var future = new Future();
    console.log("New Executive Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=executive_profile&option=indie&call="+call+"&param=" + comp_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
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
    var future = new Future();

    console.log("Money Memory Request",company_id, initial_investment, start_date, end_date);
    var Start = new Date();
    Start = Start.getTime();
    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=money_memory&param=" + company_id + "&mmem=" + initial_investment + "," + end_date + "," + start_date;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    })

    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  CompEarningsIndie: function(comp_id){
    var future = new Future();
    console.log("New Executive Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    //var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=earnings&param=FB";
    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_profile&option=indie&call=earnings&param=" + comp_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  CompWebPageData: function(comp_id, option){
    var future = new Future();
    console.log("New company Request",comp_id);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString =   "http://apifin.synapsys.us/call_controller.php?action=company_page&option=" + option + "&param=" + comp_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });
    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  ExecWebpageData: function(exec_id, option) {
    var future = new Future();

    console.log("New CollegeRivals Request",exec_id,option);
    var Start = new Date();
    Start = Start.getTime();

    var UrlString = "http://apifin.synapsys.us/call_controller.php?action=executive_page&option="+ option +"&param=" + exec_id;
    console.log(UrlString);

    Meteor.http.get(UrlString, function(error, data){
      try{
        data = JSON.parse(data['content']);
      } catch (e) {
        future.throw(e);
        return false;
      }
        future.return(data);
    });

    var End = new Date();
    End = End.getTime();
    var TimeDif = (End - Start)/1000;
    console.log("Request finished in " + Math.round(TimeDif*10)/10 + " seconds");
    this.unblock();
    return future.wait();
  },

  //AI CONTENT METEOR CALL
  GetAIContent: function(comp_id){
    this.unblock();
    var URL = "http://apifin.synapsys.us/yseop/yseop-company-class.php?id=" + comp_id;
    console.log(URL);
    var future = new Future();
    curTime.withValue((new Date()).getTime(),function(){
      curcomp_id.withValue(comp_id,function(){
        var callback1 = Meteor.bindEnvironment(function(error, data){
          if ( error ) {
            future.return(error.content);
            console.log("error");
            return false;
          }
          var URL = "http://72.52.250.160:8080/yseop-manager/direct/passfail-training/dialog.do";
          var UN = "client";
          var PW = "123";
          var info = data.content;
          firstTime.withValue(Math.round(((new Date()).getTime() - curTime.get())/100)/10,function(){
            curTime.withValue((new Date()).getTime(),function(){
              var callback2 = Meteor.bindEnvironment(function(error,data){
                if ( error ) {
                  future.return(data);
                  console.log("SNTAI|\"" + curcomp_id.get() + "\",\"" + (new Date()).getTime() + "\",\"" + firstTime.get() + "\",\"" + (Math.round(((new Date()).getTime() - curTime.get())/100)/10) + "\",\"ERROR\"|");
                  return false;
                }
                console.log("SNTMAG|\"" + curcomp_id.get() + "\",\"" + (new Date()).getTime() + "\",\"" + firstTime.get() + "\",\"" + (Math.round(((new Date()).getTime() - curTime.get())/100)/10) + "\",\"SUCCESS\"|");
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
});

Meteor.startup(function(){
  robots.addLine('User-agent: *');
  robots.addLine('Disallow: /');
});

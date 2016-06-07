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
  executive: function(){
    var data = Session.get('college_rivals');
    if ( typeof data == "undefined" ) {
      return '';
    }
    data.ExecURL = Router.pick_path('content.executiveprofile',{
      exec_id: data.officer.o_id,
      fname: data.officer.o_first_name,
      lname: data.officer.o_last_name,
      ticker: data.officer.c_ticker
    });

    data.rivalsUrl = Router.pick_path('content.collegerivals',{
      exec_id: data.officer.o_id,
      fname: data.officer.o_first_name,
      lname: data.officer.o_last_name,
      ticker: data.officer.c_ticker
    });
    var dataList = data.officer;
    data.officer.fullname = data.officer.o_first_name + ' ' + data.officer.o_last_name;
    dataList.c_price = nFormatter(Number(dataList['c_price']).toFixed(2));
    dataList.c_price_change = nFormatter(Number(dataList['c_price_change']).toFixed(2));
    dataList.c_percentage_change = nFormatter(Number(dataList['c_percentage_change']).toFixed(2));
    if( typeof dataList.c_change_operator == "undefined" ){
      if(Number(dataList.c_percentage_change) < 0){
        dataList.c_price_change = Math.abs(Number(dataList.c_price_change));
        dataList.c_percentage_change = Math.abs(Number(dataList.c_percentage_change));
        dataList.c_change_operator = 0;
      } else {
        dataList.c_change_operator = 1;
      }
    }

    data.lastupdate = (new Date()).toSNTForm();
    data.officer.College = data.officer.education_data[0].College;
    data.schools = [];
    edu_data_uq = [];
    edu_data = data.officer.education_data;
    for ( var i = 0; i < edu_data.length; i++ ) {
      var uq = true;
      for ( var u = 0; u < i; u++ ) {
        if ( edu_data[i].College == edu_data[u].College && i != u ) {
          uq = false;
        }
      }
      if ( uq ) {
        edu_data_uq[edu_data_uq.length] = edu_data[i];
      }
    }
    for ( var i = 0; i < edu_data_uq.length; i++ ) {
      edu_data_uq[i].rivalsUrl = Router.pick_path('content.collegerivals',{
        exec_id: data.officer.o_id,
        fname: data.officer.o_first_name,
        lname: data.officer.o_last_name,
        ticker: data.officer.c_ticker
      });
      edu_data_uq[i].rivals = data.rivals[edu_data_uq[i].university_tr_id];
      // edu_data_uq[i].rivals = data.rivals[1405];
      if ( typeof edu_data_uq[i].rivals == 'array' ) {
        for ( var u = 0; u < edu_data_uq[i].rivals.length; u++ ) {
          edu_data_uq[i].rivals[u].url = Router.pick_path('content.executiveprofile',{
            fname: edu_data_uq[i].rivals[u].o_first_name,
            lname: edu_data_uq[i].rivals[u].o_last_name,
            exec_id: edu_data_uq[i].rivals[u].o_id,
            ticker: edu_data_uq[i].rivals[u].c_ticker
          });
        }
      }
    }
    data.colleges = edu_data_uq;

    return data;
  },
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

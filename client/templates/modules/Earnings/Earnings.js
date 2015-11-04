/*
Author: Naveen
Created: [07/21/2015]

Modified By:Zachary Pearson
Modified On: 10/09/2015
Modifications Made: Added function to retrieve data from earnings

Description: This file includes js code for the module Earnings_Page
Associated Files: [The Earnings.less, Earnings.html for the module]
*/
Template.Earnings.helpers({ //helper for the template earnings  is created to provide the handlebar with the below corresponding  data
  tiles:[
    {open_page:'OPEN PAGE',awesome:'fa-file-text-o',descrip:'Prev.Released Earnings',tile_name:'Prev.Released Earnings',red:'',style:'earnings-displaynone'},
    {open_page:'OPEN PAGE',awesome:'fa-search',descrip:'Find Earning Releases',tile_name:'Find Earning Releases ',red:'',style:'earnings-displaynone'},
    {open_page:'OPEN PAGE',awesome:'fa-calendar',descrip:'Earnings Calendar',tile_name:'Earnings Calendar ',red:'NEW',style:'earning_body-redbutton'}
  ],
  //Helper to show/hide data if data exists
  dataExists: function(){
    var data = Session.get('earnings');

    return typeof data === 'undefined' ? false : true;
  },
  earns: function(){//function to retrieve data for earnings
    var data = Session.get("earnings");
    var company = Session.get("profile_header");
    var array=[];
    var i;

    for(i=0; i< data.length-1;i++)
    {
      array[i] = {};
      var date = data[i]['e_filing_date'].split('-');//splits date into array containing year, month, day
      var month = date[1];
      var day = date[2];
      var fiscYear = data[i]['e_fiscal_year'];
      if(i<data.length-1)
      {
        if(Session.get('IsCompany')){
          array[i]['company'] = company['c_name'];
          array[i]['image'] = company['c_logo'];
        }else{
          array[i]['company'] = data[i]['c_name'];
          array[i]['image'] = data[i]['c_logo'];
        }
        array[i]['description'] = data[i]['e_report_title'];
        array[i]['month'] = calendarMonths[parseInt(month-1)];
        array[i]['day'] = day;
      }
    }
    //console.log(array);
    return array;
  },

  company_name: function(){
    var company = Session.get("profile_header");
    if(typeof company == 'undefined'){
      return '';
    }
    return company['c_name'];
  },

  title: function() {
    if ( typeof Router.current().params.loc_id == "undefined" ) {
      var company = Session.get("profile_header");
      if(typeof company == 'undefined'){
        return '';
      }
      return 'What\'s Happening With ' + company['c_name'] + '\'s Earnings?';
    } else {
      var company = Session.get("profile_header");
      if(typeof company == 'undefined'){
        return '';
      }
      return 'What\'s Happening With '+company.location+' Earnings?';
    }
  },

  preleasedURL:function(){
    var data = Session.get('profile_header');
    if(typeof data =='undefined'){
      return '';
    }
    return Router.pick_path('content.earningsPR');

  },

});

var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

var calendarMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

function ComingSoon(){
  return Router.pick_path('content.comingsoon');
}

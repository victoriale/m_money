/*
  Author: Sri Sindhusha Kuchipudi
  Created: 10/15/2015
  Description: about_exec_page webpage
  Associated Files: about_exec_page.html, about_exec_page.less, about_exec_page_logic.js
*/

//get data from Session.key
var data = Session.get('profile_header');
//Helpers to display dynamic data from session
Template.about_exec_page.helpers({
  //Helper to navigate back to executive profile
  backToExec: function(){
    var params = Router.current().getParams();
    return Router.pick_path('content.executiveprofile', {
      lname:params.lname,
      fname:params.fname,
      ticker:params.ticker,
      exec_id: params.exec_id
    });
  },
  //to get and display first name
  fname: function() {
    var data = Session.get('profile_header');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data['o_first_name'];
    return name;
    },
    //to get and display last name
    lname: function() {
      var data = Session.get('profile_header');
      if(typeof data == "undefined")
      {
        return '';
      }
      var name = data['o_last_name'];
      return name;
    },
  //to get and display only date
  dt : function()
   {
     var data = Session.get('profile_header');
     if(typeof data == "undefined")
     {
       return '';
     }
     var inputDate = data['o_last_updated'];
     var date = new Date(inputDate);
     if (!isNaN(date.getTime())) {
     var day = date.getDate().toString();
     var month = (date.getMonth() + 1).toString();
     return (month[1] ? month : '0' + month[0]) + '/' +
     (day[1] ? day : '0' + day[0]) + '/' +
     date.getFullYear();
  }
},
    //to get and display last updated date
    upd:function(UNIX_timestamp){
      var data = Session.get('profile_header');
      if(typeof data == "undefined")
      {
        return '';
      }
      var inputDate = data['o_last_updated'];
      var a = new Date(inputDate);
      var year = a.getFullYear();
      var month = a.getMonth()+1;
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = ((month.toString().length===1)?('0'+month):month) + '/' + ((date.toString().length===1)?('0'+date):date) + '/' + year+ ' '+'at'+ ' ' + ((hour>12)?(hour-12):hour) + ':' + ((min.toString().length===1)?('0'+min):min) +' '+ ((hour>12)?('pm'):'am') ;
      return time;
    },
    //the data in about section
    bio: function() {
      var data = Session.get('profile_header');
      if(typeof data == "undefined")
      {
        return '';
      }
      var bio = data['o_bio'];
      return bio;
    },
    //to get and display pic
    profile: function() {
      var data = Session.get('profile_header');
      if(typeof data == "undefined")
      {
        return '';
      }
      data['o_last_updated'] = (new Date(data['o_last_updated'])).toSNTFormTime();
      data['locurl'] = Router.pick_path('content.locationprofile',{
        loc_id: data.c_hq_state,
        city:data.c_hq_city
      });
      console.log(data);
      return data;
    },

//to get and display Location details
  location: "The United States of America",
});

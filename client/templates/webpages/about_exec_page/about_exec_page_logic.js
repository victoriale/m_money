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
//url to link to the executive page from top bar and view profile
  Execurl: function() {
    var data = Session.get("profile_header");
    if(typeof data == "undefined")
    {
      return '';
    }
    var urlid= data['o_id'];
     return Router.path('content.executiveprofile',{
      partnerid: null,
      exec_id: urlid
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
    pic: function() {
      var data = Session.get('profile_header');
      if(typeof data == "undefined")
      {
        return '';
      }
      var pic = data['o_pic'];
      return pic;
      },

//to get and display Location details
  location: "The United States of America",
  //to get and display paragraph data
  bigdesc1: "Lorem ipsum dolor sit amet, tale homero dolores at pro, eam eu graeco civibus "
          + "antiopam. Ut congue quaeque iudicabit nec, duo ut tollit electram. Eum ludus "
          + "corpora ne, te erat aperiam vel, sit ei accumsan epicurei temporibus. Cu eos "
          + "dolorem laboramus. Heabeo congue has ad, ea etiam suscipit eos, duo an fabellas "
          + "salutatus comperhensam. Nisl illud an vix.",
  bigdesc2: "Ut duo docendi qualisque, fugit principes evertitur an has, meis aliquam "
          + "reprimque ei cum. Eu eum vero magna quodsi, pri ex nobis salutandi, qui id "
          + "homero quaestio. In cum quodsi fastidii platonem. Vis eu percipit antiopam "
          + "argumentum, nam ad eius mandamus. Ut duo hinc accumsan petentium.",
  bigdesc3: "Mei ea quando utinam, everti accusam consetetur te sed, ea suas stet expentenda "
          + "sed. His augue everti molestiae ne. Est alia suavvitate an, cu quot affert suspcipit "
          + "est. Eum hinc mazim theophrastus eu, nec quod corpora consulatu no. Eirmod "
          + "delicatissimi cum ut. Sea lorem audire adolescens an, id homero graeci labore cum, "
          + "etiam munere convenire cu sit.",
  bigdesc4: "lus ridens qualisque theophrastus ea. In eos audiam platoneum splendide, mei ei dicit "
          + "paulo tempor, ut mea harum voluptua. Eos ei odio vulputate, melius persecuti id vel. "
          + "Pre ei primis posidonium. Molestie sententiae scripserit et sed, at dolore pertinacia has, "
          + "sed id novum postea assueverit.",
  bigdesc5: "Sed patrioque intellegam complectitur ei, eos cu ferri suscipiantur. Pro putant fuisset "
          + "pericula at, purto veniam docendi mei no. Imperdiet euripidis pri at, te quas dicam molestiae "
          + "cum, vitae indoc- tum philosophia at sed. Sea latine atomorum et, eos inermis facilisis te. Ne "
          + "sea simul exerci tritani, at sed pruto indoctum delicatissimi."
});

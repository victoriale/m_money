/* Author: Ryan Fisher
** Created: 07/17/2015
** Description: .js file for About Exec Page
** Associated Files: about_exec.html, about_exec.less, about_exec_logic.js
*/

Template.about_exec.onRendered(function(){

  this.autorun(function(){
    var data = Session.get('college_rivals');
    var exec_id = Session.get('exec_id');

    if(typeof exec_id == 'undefined' || typeof data == 'undefined' || typeof data['officer'] == 'undefined'){
      return '';
    }
    var RivalArray = [];
    //set the officer id of the current page
    data['officer']['e_id'] = exec_id;
    //push all data returned into a list array to be used for the module
    RivalArray.push(data['officer']);
    $.map(data.rivals, function(data, index){
      data['e_id'] = index;
      RivalArray.push(data);
      Session.set('about_exec', RivalArray);
    });
  });

});

Template.whos_who.onCreated(function(){
  //setting the counter to 0
  var counter = 0;
  Session.set("count",counter);
});

// calling the data object
var data = Session.get('about_exec');
var counter = Session.get('count');
//events to sho wnext rivals on button click

//
Template.about_exec.helpers({
  execComp:function(){
    var data = Session.get('about_exec');
    var counter = Session.get('count');
    if(typeof data == 'undefined'){
      return '';
    }
    data[counter]['comp_url'] = Router.pick_path('content.companyprofile',{
      ticker:data[counter].c_ticker,
      name:compUrlName(data[counter].c_name),
      company_id:data[counter].c_id
    });
    return data[counter]['comp_url'];
  },
  rivalInfo: function(){
    var data = Session.get('about_exec');
    if(typeof data == 'undefined'){
      return '';
    }
    $.map(data, function(val, i){
      val.main_url = Router.pick_path('content.executiveprofile',{
        fname:val.o_first_name,
        lname: val.o_last_name,
        ticker:val.c_ticker,
        exec_id:val.o_id
      })
    })
    return data;
  },

  execURL:function(){
    var data = Session.get('about_exec');
    var counter = Session.get('count');
    $.map(data, function(val, i){
      val.main_url = Router.pick_path('content.executiveprofile',{
        fname:val.o_first_name,
        lname: val.o_last_name,
        ticker:val.c_ticker,
        exec_id:val.o_id
      })
    })
    return data[counter].main_url;
  },

  compImage:function(){
    var data = Session.get('about_exec');
    var counter = Session.get('count');
    return data[counter].c_logo;
  },
  //link to Education History page
  EHTileURL: function(){
    var params = Router.current().getParams();
    if(typeof params != 'undefined'){
        return Router.pick_path('content.collegerivals',{
          lname:params.lname,
          fname:params.fname,
          ticker:params.ticker,
          exec_id: params.exec_id,
        });
    }
  },

  //link to BIO or About Exec page
  BioTileURL: function(){
    var params = Router.current().getParams();
    if(typeof params != 'undefined'){
        return Router.pick_path('content.aboutexec',{
          lname:params.lname,
          fname:params.fname,
          ticker:params.ticker,
          exec_id: params.exec_id,
        });
    }
  },

  //link to Educatio History page
  FAQTileURL: function(){
    var params = Router.current().getParams();
    if(typeof params != 'undefined'){
        return Router.pick_path('content.aboutexec',{
          lname:params.lname,
          fname:params.fname,
          ticker:params.ticker,
          exec_id: params.exec_id,
        });
    }
  },

  CollegeRivals: function(){
    var params = Router.current().getParams();
    if(typeof params != 'undefined'){
        return Router.pick_path('content.collegerivals',{
          lname:params.lname,
          fname:params.fname,
          ticker:params.ticker,
          exec_id: params.exec_id,
        });
    }
  },

  //first name below the image circle
  fname: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data[index]['o_first_name'];
    return name;
  },
  //last name below the image circle
  lname: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data[index]['o_last_name'];
    return name;
  },
  //execcutive id used to retrun to the router
  // exec_id: function() {
  //   var data = Session.get('about_exec');
  //   var index = Session.get("count");
  //   if(typeof data == "undefined")
  //   {
  //     return '';
  //   }
  //   var exec_id = data[index]['o_id'];
  //   return exec_id;
  // },
    //University name below the image circle
  univ: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    if(typeof data == "undefined")
    {
      return '';
    }
    var univ = data[index]['education_data'][0]['College'];
    return univ;
  },
  //Helper to get image url
  pic: function(){
    var data = Session.get('about_exec');
    var index = Session.get("count");

    if(typeof data == "undefined")
    {
      return '';
    }

    var pic = data[index].o_pic;
    return pic;
  },
    //degree below the image circle
    degree: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    if(typeof data == "undefined")
    {
      return '';
    }
    var degree = data[index]['education_data'][0]['Degree'];
    return degree;
  },
  //  Graduated Status below the image circle
  status: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    var degree = data[index]['education_data'][0]['Degree'];
    if(!degree)
    {
        return 'N/A';
    }
    var arrayofstrings=degree.split(" ");
    if (arrayofstrings[0]==="Masters")
    // if(degree.contains("Masters"))
    {
      //status="Yes";
      return 'Yes';
    }
    var status="N/A";
    return status;
  },
  abbr: function() {
    var data = Session.get('about_exec');
    var index = Session.get("count");
    var arr="";
    var degree = data[index]['education_data'][0]['Degree'];
    var arrayofstrings=degree.split(" ");
    for(var k=0; k<arrayofstrings.length; k++)
    {
      arr = arr + arrayofstrings[k].substring(1,0);
    }
    var res = arr.replace(/o/g, "");
    return res;
  },

  //data on headers
  first_name: function() {
    var data = Session.get('profile_header');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data['o_first_name'];
    return name;
  },
  last_name: function() {
    var data = Session.get('profile_header');
    if(typeof data == "undefined")
    {
      return '';
    }
    var name = data['o_last_name'];
    return name;
  },

  title:"COLLEGE RIVALS",
  //status:"N/A",
//each function to call n the tiles below
  tt: function(){
    var counter = Session.get("count");
    var data1 = Session.get("about_exec");
    var returnArray = [];
    var j = counter + 1;
    //var arr = " ";
    //logic to move the first item in the tile to the data below the image circle.
    for(var i=0;i<data1.length-1;i++)
    {
      if(j == data1.length)
      {
        j = 0;
      }
      returnArray[i] = {}
      var fnm = data1[j]['o_first_name'];
      var lnm = data1[j]['o_last_name'];
      var cnm = data1[j]['c_name'];
      var tick = data1[j]['c_ticker'];
      var univer = data1[j]['education_data'][0]['College'];
      var degr = data1[j]['education_data'][0]['Degree'];
      var longtl = data1[j]['long_title'];
      var urlid = data1[j]['o_id'];
      var img = data1[j]['o_pic'];
      var cid = data1[j]['c_id'];
      data1[j]['exec_url'] = Router.pick_path('content.executiveprofile',{
        fname:fnm,
        lname:lnm,
        ticker:tick,
        exec_id:urlid
      });
      data1[j]['comp_url'] = Router.pick_path('content.companyprofile',{
        ticker:tick,
        name:compUrlName(cnm),
        company_id:cid
      });
    //  var abb = abbr();
      if(j < data1.length)
      {
        returnArray[i]['fnm1'] = fnm;
        returnArray[i]['lnm1'] = lnm;
        returnArray[i]['cnm1'] = cnm;
        returnArray[i]['univer1'] = univer;
        var arr = " ";
        returnArray[i]['degr1'] = degr;
        returnArray[i]['img'] = img;
        returnArray[i]['execurl'] = Router.pick_path('content.executiveprofile',{
          fname:fnm,
          lname:lnm,
          ticker:tick,
          exec_id:urlid
        });
        returnArray[i]['compurl'] = Router.pick_path('content.companyprofile',{
          ticker:tick,
          name:compUrlName(cnm),
          company_id:cid
        });
        //returnArray[i]['abbr1']=  abb;
        if(degr)
        {
          var arrayofstrings=degr.split(" ");
          for(var k=0; k<arrayofstrings.length; k++)
          {
            arr = arr + arrayofstrings[k].substring(1,0);
          }
          var res = arr.replace(/o/g, "");
          var res1 = res.replace(/i/g, "");
          returnArray[i]['arr1']=res1;
        }
        returnArray[i]['longtl1'] = longtl;
        //returnArray[i]['arr1']=arr;
      }
      j++;
    }
    return returnArray;
  },
  //This is used to return to the excutive id and the path to the router that links to the new page.
});
Template.about_exec.events({

  'click .exec_body_featured_left-button': function(){
    var data = Session.get("about_exec");
    var counter = Session.get("count");
    if(counter > 0){
      counter--;
      Session.set("count",counter);
      //$('.exec_body_featured_info_sub-image').html("#"+counter);
    }
    else
   {
     counter = data.length-1;
     Session.set("count", counter);
   }
  },
  'click .exec_body_featured_right-button': function(){
    var data = Session.get("about_exec");
    var counter = Session.get("count");
    if(counter < data.length-1){
      counter++;
      Session.set("count",counter);
    //  $('.exec_body_featured_info_sub-image').html("#"+counter);
    }
    else
   {
     counter = 0;
     Session.set("count", counter);
   }
  },
});

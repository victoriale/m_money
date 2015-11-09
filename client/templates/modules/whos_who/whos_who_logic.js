/* Author: [jyothyswaroop]
Created: [10/6/2015]
Description: [Finance : Whos_Who_logic.js Page Module] */

Template.new_whos_who.onCreated(function(){
  var counter = 0;
  Session.set("whos_count",counter);
})

Template.new_whos_who.events({
  'click .ww_top-button': function(){
    var counter = Session.get("whos_count");
    var who = Session.get('whos_who');
    if(Session.get('IsCompany')){
      who = who['officers'];
    }
    if(counter < who.length - 1)
    {
      counter++;
      Session.set("whos_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("whos_count", counter);
    }
  },
})

Template.new_whos_who.helpers({
  header:function(){
    var head = Session.get('profile_header');
    var params = Router.current().getParams();
    if(typeof head == 'undefined'){
      return '';
    }
    if(Session.get('IsLocation')){
      return fullstate(params.loc_id);
    }
    return head.c_name;
  },

  curDate: function(){
      return CurrentDate();
  },

  ww_data: function(){
    if(Session.get('IsCompany')){
      var who = Session.get('whos_who')['officers'];
    }else{
      var who = Session.get('whos_who');
    }
    if(typeof who == 'undefined'){
      return '';
    }
    var wwArray = [];
    $.map(who, function(val, i){
      var newObj = {};
      if(i % 2 == 0){
        newObj['background'] = '#f2f2f2';
      }else{
        newObj['background'] = '#ffffff';
      }
      newObj.rank = i+1;
      newObj.o_pic = val.o_pic;
      newObj.first = val.o_first_name;
      newObj.last = val.o_last_name;
      newObj.o_url = Router.pick_path('content.executiveprofile',{
        fname: val.o_first_name,
        lname: val.o_last_name,
        ticker: val.c_ticker,
        exec_id: val.o_id
      });
      if(!Session.get('IsCompany')){
        newObj.compUrl = Router.pick_path('content.companyprofile',{
          ticker:val.c_ticker,
          name:compUrlName(val.c_name),
          company_id:val.c_id,
        });
      }
      newObj.c_logo = val.c_logo;
      newObj.c_name = val.c_name;
      if(Session.get('IsCompany')){
        newObj.title = val.o_titles[0];
      }else{
        newObj.title = val.o_current_title.long_title;
      }

      wwArray.push(newObj);
    })
    return wwArray;
  },

  ww_carousel: function(){
    var counter = Session.get("whos_count");
    var head = Session.get('profile_header');
    if(Session.get('IsCompany')){
      var who = Session.get('whos_who')['officers'];
    }else{
      var who = Session.get('whos_who');
    }
    if(typeof who == 'undefined'){
      return '';
    }
    var wwArray = [];
    $.map(who, function(val, i){
      var newObj = {};
      if(i % 2 == 0){
        newObj['background'] = '#f2f2f2';
      }else{
        newObj['background'] = '#ffffff';
      }
      newObj.rank = i+1;
      newObj.o_pic = val.o_pic;
      newObj.first = val.o_first_name;
      newObj.last = val.o_last_name;
      newObj.o_url = Router.pick_path('content.executiveprofile',{
        fname: val.o_first_name,
        lname: val.o_last_name,
        ticker: val.c_ticker,
        exec_id: val.o_id
      });
      if(!Session.get('IsCompany')){
        newObj.compUrl = Router.pick_path('content.companyprofile',{
          ticker:val.c_ticker,
          name:compUrlName(val.c_name),
          company_id:val.c_id,
        });
      }
      newObj.c_logo = val.c_logo;
      newObj.c_name = val.c_name;
      if(Session.get('IsCompany')){
        newObj.title = val.o_titles[0];
      }else{
        newObj.title = val.o_current_title.long_title;
      }

      wwArray.push(newObj);
    })
    return wwArray[counter];
  },

  WholeListUrl:function(){
    var head = Session.get('profile_header');
    var params = Router.current().getParams();
    if(typeof head =='undefined'|| head==''){
      return '';
    }

    return Router.pick_path('content.boardcommittee',{
      ticker:head.c_ticker,
      name:compUrlName(head.c_name),
      company_id:head.c_id
    });
  },
})

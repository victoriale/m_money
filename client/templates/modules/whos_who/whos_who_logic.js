/* Author: [jyothyswaroop]
Created: [10/6/2015]
Description: [Finance : Whos_Who_logic.js Page Module] */
Template.whos_who.onCreated(function(){
  var counter = 0;
  Session.set("whos_count",counter);
})
var who = Session.get('whos_who');
var ldt = 0;

Template.whos_who.events({
  'click .module-who-button-left': function(){
    var who = Session.get("whos_who");
    var counter = Session.get("whos_count");
    if(counter > 0){
      counter--;
      Session.set("whos_count",counter);
    }
  },
  'click .module-who-button-right': function(){
    var who = Session.get("whos_who");
    var counter = Session.get("whos_count");
    if(counter < who.length-1){
      counter++;
      Session.set("whos_count",counter);
    }
  },
})

Template.whos_who.helpers({
  wtile:[
    {name:"Founders",fnt:"fa-rocket"},
    {name:"Executives",fnt:"fa-briefcase"},
    {name:"Board & Committee",fnt:"fa-gavel"},
 ],
  loc_bwn:['Cupertino, CA'],

  compy_name:['Apple,Inc.'],

  first_domain:['Retail and Online Stores'],

  //functions
  author_name:function(){
    var who = Session.get('whos_who');
    var index = Session.get("whos_count");
    if(typeof who == 'undefined')
    {
      return '';
    }
    var fname = who[index]['o_first_name'];
    var lname = who[index]['o_last_name'];
    var mname = who[index]['o_middle_initial'];

    return fname +" "+ mname +" "+ lname;
  },

  titles:function(){
  var who = Session.get('whos_who');
  var index = Session.get("whos_count");
  if(typeof who == "undefined")
  {
    return '';
  }
  var title = who[index]['o_titles'][0];
  return title;
  },

  everyech: function(){
    ldt++;
    var who = Session.get("whos_who");
    var returnArray = [];
    var i,j = 0;
    for(i=1;i<who.length-1;i++)
    {
      returnArray[i] = {}
      var fname = who[i]['o_first_name'];
      var lname = who[i]['o_last_name'];
      var mname = who[i]['o_middle_initial'];
      var title = who[i]['o_titles'][0];
      if(i<who.length-1){
      returnArray[i]['pnames'] = fname +" "+ mname +" "+ lname;
      returnArray[i]['ptitle'] = title;
      returnArray[i]['company'] = "Apple.Inc.";
    }
    }
      return returnArray;
  }

});

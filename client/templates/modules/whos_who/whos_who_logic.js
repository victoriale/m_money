/* Author: [jyothyswaroop]
Created: [10/6/2015]
Description: [Finance : Whos_Who_logic.js Page Module] */
Template.whos_who.onCreated(function(){
  var counter = 0;
  Session.set("whos_count",counter);

  /*
  */
})
var who = Session.get('whos_who');
var ldt = 0;

Template.whos_who.events({
  'click .module-who-button-left': function(){
    var counter = Session.get("whos_count");
    var who = Session.get('whos_who');
    if(Session.get('IsCompany')){
      who = who['officers'];
    }
    if(counter > 0){
      counter--;
      Session.set("whos_count",counter);
    }
    else
    {
      counter = who.length-1;
      Session.set("whos_count", counter);
    }
  },
  'click .module-who-button-right': function(){
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

Template.whos_who.helpers({
  //USED FOR TILES
  wtile: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var tilearray = [
      {name:"Founders",fnt:"fa-rocket", url:foundersURL(data.c_id)},
      {name:"Executives",fnt:"fa-briefcase", url:foundersURL(data.c_id)},
      {name:"Board & Committee",fnt:"fa-gavel", url:foundersURL(data.c_id)},
    ];
    return tilearray;
  },

  //functions
  companyName: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },

  execImage:function(){
    var data = Session.get('whos_who');
    //Check if data and data.officers is defined. If so set who to data.officers, else set to undefined (Force to exit helper)
    var who = typeof(data) !== 'undefined' && typeof(data.officers) !== 'undefined' ? data['officers'] : undefined;
    var index = Session.get("whos_count");
    if(typeof who == 'undefined')
    {
      return '';
    }
    return who[index]['o_pic'];
  },

  author_name:function(){
    var data = Session.get('whos_who');
    //Check if data and data.officers is defined. If so set who to data.officers, else set to undefined (Force to exit helper)
    var who = typeof(data) !== 'undefined' && typeof(data.officers) !== 'undefined' ? data['officers'] : undefined;
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

  execImage:function(){
    var data = Session.get('whos_who');
    if(typeof data =='undefined'){
      return '';
    }
    var index = Session.get("whos_count");
    return data[index].o_pic;
  },
  execURL:function(){
    var who = Session.get('whos_who');
    var index = Session.get("whos_count");
    var params = Router.current().getParams();
    if(typeof who == 'undefined')
    {
      return '';
    }
    if(Session.get('IsCompany')){
      who = who['officers'];
      var url = Router.path('content.executiveprofile',{
        lname:who[index].o_last_name,
        fname:who[index].o_first_name,
        ticker:who[index].c_ticker,
        exec_id:who[index].o_id
      });
    }

    if(Session.get('IsExec')){
      var url = Router.path('content.executiveprofile',{
        lname:who[index].o_last_name,
        fname:who[index].o_first_name,
        ticker:who[index].c_ticker,
        exec_id:who[index].o_id
      });
    }
    return url;
  },

  titles: function(){
    var who = Session.get('whos_who');
    var index = Session.get("whos_count");
    if(typeof who == "undefined")
    {
      return '';
    }
    if(Session.get('IsCompany')){
      var title = who['officers'][index]['o_titles'][0];
    }
    if(Session.get('IsExec')){
      var title = who[index]['o_current_title']['titles'][0]['title'];
    }
  return title;
  },

  everyech: function(){
    // ldt++;
    var counter = Session.get("whos_count");
    var data = Session.get('profile_header');
    var who = Session.get("whos_who");

    if(typeof who == 'undefined' || typeof data == 'undefined'){
      return '';
    }
    var returnArray = [];
    var j = counter + 1;
    if(Session.get('IsCompany')){
      var who = who['officers'];
      for(var i=0;i<who.length-1;i++)
      {
        if(j == who.length)
        {
          j = 0;
        }
        returnArray[i] = {}
        var fname = who[j]['o_first_name'];
        var lname = who[j]['o_last_name'];
        var ticker = who[j]['c_ticker'];
        var mname = who[j]['o_middle_initial'];
        var title = who[j]['o_titles'][0];
        var url = Router.path('content.executiveprofile',{
          lname:lname,
          fname:fname,
          ticker:ticker,
          exec_id:who[j].o_id
        });

        if(j < who.length)
        {
          returnArray[i]['pnames'] = fname +" "+ mname +" "+ lname;
          returnArray[i]['ptitle'] = title;
          returnArray[i]['company'] = data.c_name;
          returnArray[i]['url'] = url;
          returnArray[i]['exec_image'] = data.c_logo;
        }
        j++;
      }
    }
    if(Session.get('IsExec')){
      for(var i=0;i<who.length-1;i++)
      {
        if(j == who.length)
        {
          j = 0;
        }
        returnArray[i] = {}
        var fname = who[j]['o_first_name'];
        var lname = who[j]['o_last_name'];
        var ticker = who[j]['c_ticker'];
        var mname = who[j]['o_middle_initial'];
        var title = who[j]['o_current_title']['titles'][0]['title'];
        var url = Router.path('content.executiveprofile',{
          lname:lname,
          fname:fname,
          ticker:ticker,
          exec_id:who[j].o_id
        });
        if(j < who.length)
        {
          returnArray[i]['pnames'] = fname +" "+ mname +" "+ lname;
          returnArray[i]['ptitle'] = title;
          returnArray[i]['company'] = data.c_name;
          returnArray[i]['url'] = url;
          returnArray[i]['exec_image'] = data.c_logo;
        }
        j++;
      }
    }
    return returnArray;
  },
  connectionsURL: function(){
    var data = Session.get('profile_header');
    if(typeof data =='undefined'){
      return '#'
    }
    return foundersURL(data.c_id);
  },

  checkdata: function(){
    var data = Session.get('whos_who');
    if(typeof data == 'undefined'){
      return '';
    }
    return data;
  },
});

function foundersURL(c_id){
  var params = Router.current().getParams();

  return Router.path('content.boardcommittee',{
    ticker:params.ticker,
    name:params.name,
    company_id: c_id
  })
}

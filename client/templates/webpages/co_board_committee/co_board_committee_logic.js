/*
Author: jyothyswaroop
Created: 08/10/2015
Description: co_board_committee page
Associated Files: co_board_committee.less and co_board_committee.html
*/
var counter=0;
Template.co_board_committee.onCreated(function(){
  Session.set('board_count', 0);
})
//renders the data when page loads
Template.co_board_committee.onRendered(function(){

});

var backgroundStyle="tilewhite";
Template.co_board_committee.helpers({
//gave names for dyamic access {{getheadername}}
  getheadername1: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }

    return data.c_name;
  },

  location: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var loc = data.c_hq_city + ", " + data.c_hq_state;
    return loc;
  },

  officerList: function(){
    var list = Session.get('officers');
    if(typeof list == 'undefined'){
      return '';
    }
    $.map(list,function(data, index){
      data['o_last_updated'] = data['o_last_updated'].split(' ')[0];
      data['o_last_updated'] = data['o_last_updated'].replace(/-/g, '/');
      data['url'] = Router.path('content.executiveprofile',{
        exec_id: data.o_id
      });
    });
    return list;
  },

  officer: function(){
    var list = Session.get('officers');
    var count = Session.get('board_count');
    if(typeof list == 'undefined'){
      return '';
    }
    list[count]['o_last_updated'] = list[count]['o_last_updated'].split(' ')[0];
    list[count]['o_last_updated'] = list[count]['o_last_updated'].replace(/-/g, '/');
    list[count]['url'] = Router.path('content.executiveprofile',{
      exec_id: list[count].o_id
    });

    return list[count];
  },

  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
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

Template.co_board_committee.events({
  'click .co_commi-lefthov': function(){
    var counter = Session.get("board_count");
    var board = Session.get('officers');
    if(counter > 0){
      counter--;
      Session.set("board_count",counter);
    }
    else
    {
      counter = board.length-1;
      Session.set("board_count", counter);
    }
  },
  'click .co_commi-righthov': function(){
    var counter = Session.get("board_count");
    var board = Session.get('officers');
    if(counter < board.length - 1)
    {
      counter++;
      Session.set("board_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("board_count", counter);
    }
  },
});

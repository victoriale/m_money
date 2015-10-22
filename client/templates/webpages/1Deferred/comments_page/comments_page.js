/* Author: Navya Eetaram
Created: [07/31/2015]
Description: defferedcomments
<Associated Files: defferedcomments.html, defferedcomments.js, comments.less, commentserver.js, defferedcomments.less*/

//Disabled to remove error from console (Duplicate of these mongo definitions throwing error )
//POST3 = new Mongo.Collection('post3');
//REPLY3 = new Mongo.Collection('reply3');

if(Meteor.isClient){

  Meteor.subscribe('post3');
  Meteor.subscribe('reply3');

  //Helper class
  var cmnt3;
  Template.defferedcomments.helpers({
    c_name:'GoPro, Inc.',

    post3: function () {
      return POST3.find().fetch().reverse();
    },
    cmnt3:function(){
      cmnt3 = POST3.find().fetch().length;
      return cmnt3;
    },
    reply3: function () {
      var id = String(this.cmtid);
      var reply3 = REPLY3.find({replyid: id});
      return reply3;
    },

    rpy3: function () {
      var id = String(this.cmtid);
      var rpy3 = REPLY3.find({replyid: id}).fetch().length;
      return rpy3;
    },

    time:function(){
      var time = moment().fromNow();
      return time;
    },
  });


  //Event Handlers
  Template.defferedcomments.events({
    'click .u_input_share_button': function(e) {
      e.preventDefault();
      var id = POST3.find().fetch().length;
      POST3.insert({
        text: $('.u_input_text').val(),
        cmtid: id


      });
      $('.u_input_text').val("");
    },
    'click .reply_button': function(e) {
      e.preventDefault();
      REPLY3.insert({
        replyy: $('.r-box_' + String(this.cmtid)).val(),
        replyid: String(this.cmtid)
      });
      $('.r-box_' + String(this.cmtid)).val("");
    },
    'click #sortoptions': function(e) {
      if(cmnt3!=0){
      $('.dropdown-menu').slideToggle();
    }
    },
    'click #topcomments': function(e) {
      $('.result-sort').html("Top Comments");
      $('.dropdown-menu').hide();
    },

    'click #mostrecent': function(e) {
      $('.result-sort').html("Most Recent");
      $('.dropdown-menu').hide();
    }
  });
}

/*Author: Navya Eetaram
Created: [07/08/2015]
Description: Leave_comment
<Associated Files: comments.html, comments.js, comments.less, commentserver.js*/

//Collection Creation
POST = new Mongo.Collection('post');
REPLY = new Mongo.Collection('reply');

if(Meteor.isClient){

  Meteor.subscribe('post');
  Meteor.subscribe('reply');
  var cmnt;
  //Helper class
  Template.leavecomments.helpers({

    post: function () {
      return POST.find().fetch().reverse();
    },
    cmnt:function(){
      cmnt = POST.find().fetch().length;
      return cmnt;

    },
    reply: function () {
      var id = String(this.cmtid);
      var reply = REPLY.find({replyid: id});
      return reply;
    },
    time:function(){
      var time = moment().fromNow();
      return time;
    },

    rpy: function () {
      var id = String(this.cmtid);
      var rpy = REPLY.find({replyid: id}).fetch().length;
      return rpy;
    },

    commentsurl: function(){
      return Router.pick_path('content.disqus');
    },
  });
  //Event Handlers
  Template.leavecomments.events({
    'click .u_input_share_button': function(e) {
      e.preventDefault();
      var id = POST.find().fetch().length;
      if($('.u_input_text').val()!=""){
      POST.insert({
        text: $('.u_input_text').val(),
        cmtid: id
      });
    }
      $('.u_input_text').val("");
    },
    'click .reply_button': function(e) {
      e.preventDefault();
      if($('.r-box_' + String(this.cmtid)).val()!=""){
      REPLY.insert({
        replyy: $('.r-box_' + String(this.cmtid)).val(),
        replyid: String(this.cmtid)
      });
    }
      $('.r-box_' + String(this.cmtid)).val("");
    },
    'click #sortoptions': function(e) {
      if(cmnt!=0){
      $('.aligndropdown').slideToggle();
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

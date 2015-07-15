/*Author: Navya Eetaram
Created: [07/08/2015]
Description: Leave_comment
<Associated Files: comments.html, commets.js, comments.less, commentserver.js*/

//Collection Creation
POST = new Mongo.Collection('post');
REPLY = new Mongo.Collection('reply');

if(Meteor.isClient){

  Meteor.subscribe('post');
  Meteor.subscribe('reply');

  //Helper class
  Template.comments.helpers({

    post: function () {
      return POST.find().fetch().reverse();
    },
    cmnt:function(){
      var cmnt = POST.find().fetch().length;
      return cmnt;

    },
    reply: function () {
      return REPLY.find({});
    },
    rpy:function(){
      var rpy = REPLY.find().fetch().length;
      return rpy;

    }
  });
  //Event Handlers
  Template.comments.events({
    'click .user_input_share_button': function(e) {
      e.preventDefault();
      POST.insert({
        text: $('.user_input_text').val(),
      });
    },
    'click .reply_button': function(e) {
      e.preventDefault();
      REPLY.insert({
        replyy: $('.reply-box_row_text').val()
      });
    },
    'click #sortoptions': function(e) {
      $('.dropdown-menu').slideToggle();
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

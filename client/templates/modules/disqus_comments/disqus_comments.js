DsqsPost = new Mongo.Collection('dsqscmdata');
DsqsReply = new Mongo.Collection('dsqsrpdata');

if(Meteor.isClient){

  //Get comments from database
  Meteor.subscribe('dsqscmdata');
  Meteor.subscribe('dsqsrpdata');

  //Helper class
  var cmnt3;
  Template.disqus_comments_module.helpers({
    profile_name: function(){
      var data = Session.get('profile_header');
      if(Session.get('IsCompany')){
        return data.c_name;
      } else if(Session.get('IsExec')){
        return data.o_first_name + ' ' + data.o_last_name;
      } else if(Session.get('IsLocation')){
        return data.location + ' Markets';
      } else {
        return '';
      }
    },
    //find comment
    dsqspost: function () {
      return DsqsPost.find().fetch().reverse();
    },
    //Find number of comments
    cmnt3:function(){
      cmnt3 = DsqsPost.find().fetch().length;
      return cmnt3;
    },
    //find reply
    dsqsreply: function () {
      var id = String(this.cmtid);
      var reply = DsqsReply.find({replyid: id});
      return reply;
    },
    //find number of replies
    rpy3: function () {
      var id = String(this.cmtid);
      var rpy3 = DsqsReply.find({replyid: id}).fetch().length;
      return rpy3;
    },
    //Get time of comment
    time:function(){
      var time = moment().fromNow();
      return time;
    },
  });

  //Event Handlers
  Template.disqus_comments_module.events({
    //Share button
    'click .u_input_share_button': function(e) {
      e.preventDefault();
      var id = DsqsPost.find().fetch().length;
      DsqsPost.insert({
        text: $('.u_input_text').val(),
        cmtid: id


      });
      $('.u_input_text').val("");
    },

    //Reply button
    'click .reply_button': function(e) {
      e.preventDefault();
      DsqsReply.insert({
        replyy: $('.r-box_' + String(this.cmtid)).val(),
        replyid: String(this.cmtid)
      });
      $('.r-box_' + String(this.cmtid)).val("");
    },

    //Dropdown menu events
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
    },

    //Set active tab
    'click .dsqs-cspace-hdr-tabs-best': function(e) {
      $('.dsqs-cspace-hdr-tabs-best').addClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-new').removeClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-old').removeClass('dsqs-active');
    },

    'click .dsqs-cspace-hdr-tabs-new': function(e) {
      $('.dsqs-cspace-hdr-tabs-best').removeClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-new').addClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-old').removeClass('dsqs-active');
    },

    'click .dsqs-cspace-hdr-tabs-old': function(e) {
      $('.dsqs-cspace-hdr-tabs-best').removeClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-new').removeClass('dsqs-active');
      $('.dsqs-cspace-hdr-tabs-old').addClass('dsqs-active');
    }
  });
}

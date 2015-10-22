/* Author: Navya Eetaram
Created: [07/31/2015]
Description: comments_page
<Associated Files: comments_page.html, comments_page.js, comments.less, commentserver.js, comments_page.less*/

POST3 = new Mongo.Collection('post3');
REPLY3 = new Mongo.Collection('reply3');

if(Meteor.isClient){

  Meteor.subscribe('post3');
  Meteor.subscribe('reply3');

  //Helper class
  var cmnt3;
  Template.comments_page.helpers({
    c_name:'GoPro, Inc.',
    upd: "10/24/2014, 12:36PM EDT",
    location: "The United States of America",
    rec_num: "2",
    comment1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales "
            + "magna non felis auctor, vel egestas nisi porta. Donec auctor felis nec maximus "
            + "mattis. Phaselllus eu dui vitae elit tristique vulputate. Integer diam risus, "
            + "sodales at euismod et, vehicula in nisi. Cras velit enim, suscipit set ultrices "
            + "id, scelerisque at nibh. Pellentesque vel mi ut velit congue commodo eget egestas "
            + "quam.",
    comment2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sodales magna " +
              "magna non felis auctor, vel egestas nisi porta.",
    num1: "1",
    num2: "",
    name1: "Jacob Turner",
    name2: "Cameron Brocken",
    time1: "9 hours",
    time2: "9 hours",
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

  Template.comments_page.onRendered(function () {
    $('.cspace-hdr-tabs-best').addClass('active');
  });
  //Event Handlers
  Template.comments_page.events({
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
    },

    'click .cspace-hdr-tabs-best': function(e) {
      $('.cspace-hdr-tabs-best').addClass('active');
      $('.cspace-hdr-tabs-new').removeClass('active');
      $('.cspace-hdr-tabs-old').removeClass('active');
    },

    'click .cspace-hdr-tabs-new': function(e) {
      $('.cspace-hdr-tabs-best').removeClass('active');
      $('.cspace-hdr-tabs-new').addClass('active');
      $('.cspace-hdr-tabs-old').removeClass('active');
    },

    'click .cspace-hdr-tabs-old': function(e) {
      $('.cspace-hdr-tabs-best').removeClass('active');
      $('.cspace-hdr-tabs-new').removeClass('active');
      $('.cspace-hdr-tabs-old').addClass('active');
    }
  });
}

/* Author: Ryan Fisher, Navya Eetaram
** Created: 07/30/2015
** Description: .less file for About Exec Page
** Associated Files:  comments.less, article_page.html, article_page.less, article_page_logic.js
*/

//Collection Creation
POST2 = new Mongo.Collection('post2');
REPLY2 = new Mongo.Collection('reply2');

if(Meteor.isClient){

  Meteor.subscribe('post2');
  Meteor.subscribe('reply2');

  //Helper class
  Template.article_page.helpers({
    a_name:'Biggest IPO',
    post2: function () {
      return POST2.find().fetch().reverse();
    },
    cmnt:function(){
      var cmnt = POST2.find().fetch().length;
      return cmnt;

    },
    reply2: function () {
      var id = String(this.cmtid);
      var reply2 = REPLY2.find({replyid: id});
      return reply2;
    },
    time:function(){
      var time = moment().fromNow();
      return time;
    },

    rpy: function () {
      var id = String(this.cmtid);
      var rpy = REPLY2.find({replyid: id}).fetch().length;
      return rpy;
    },

    quote:[
      {name: 'Nick Woodman', text: 'I can sell anything that I totally believe in, but I am a horrible salesman for something I don\'t'},
      {name: 'John S Watson', text: 'If I didn\'t follow my passion for surfing... I would have never come up with ... affordable gasoline...'}
    ],

    items:[
      {heading:"TD Ameritrade sees fiscal year profit at low end of foredcase",description: "CNN > Lauren Dunlap", loc:"article published on 01/25/15 at 10:11pm", num:"+2", fontawesome:"fa-newspaper-o"},
      {heading:"Lionsgate Sues Over 'Dirty Dancing' Ad Spoof", description: "CNN > Timothy Clabo",loc:"article published on 01/25/15 at 10:11pm", num:"+0", fontawesome:"fa-volume-off"}

    ],

    item2:[
      {heading:"What to Expect When TD Ameritrade (AMTD) Reports Earnings Tomorro ", description: "CNN >Veronica De La Cruz", loc:"article published on 01/25/15 at 10:11pm",num:"+10", fontawesome:"fa-play"},
      {heading:"Active Stocks News Review: Bonanza Creek Energy Inc , TD Ameritrade Holding Corp.", description: "CNN > Nick Wingfield", loc:"article published on 01/25/15 at 10:11pm",num:"+5", fontawesome:"fa-newspaper-o"}
    ]
  });


  //Event Handlers
  Template.article_page.events({
    'click .u_input_share_button': function(e) {
      e.preventDefault();
      var id = POST2.find().fetch().length;
      POST2.insert({
        text: $('.u_input_text').val(),
        cmtid: id
      });
      $('.u_input_text').val("");
    },
    'click .reply_button': function(e) {
      e.preventDefault();
      REPLY2.insert({
        replyy: $('.r-box_' + String(this.cmtid)).val(),
        replyid: String(this.cmtid)
      });
      $('.r-box_' + String(this.cmtid)).val("");
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

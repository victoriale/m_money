/*
Author: Deepika Priyanka V
Created: 07/21/2015
Description: Frequently asked questions for finance module
Associated Files: faqs_finance.html & faqs_finance.less
*/
Template.faqs_finance.onRendered( function() {
  Session.set("faqs_finance_questions",         /*---setting a session to have a loop through each container---*/
  [
    {
      ques:"Where is Apple Inc.'s Office Located?",
      ans:"Apple Inc. is headquartered in 1 Infinitie Loop, CUPERTINO, CA 95014-2083, United States."
    },
    {
      ques:"Who are the executives at Apple, Inc.?",
      ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      ques:"Who are the board members at Apple, Inc.?",
      ans:"empty empty"
    },
    {
      ques:"What was the latest executive transaction at Apple, Inc.?",
      ans:"empty Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliquafield asdasd asasdas adassd asdasda sas"
    },
    {
      ques:"What is Apple, Inc.'s current stock price?",
      ans:"empty Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedaliquafield asdasd asasdas adassd asdasda sas"
    }
  ]);
});
/* ----Helper function defined--*/
Template.faqs_finance.helpers ({
  getquestionbox: function() {                 /*-----using this function to run through loop to display container text on html --------*/
    var data = Session.get("faqs_finance_questions");
    return data;
  },
  companyName: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    return data.c_name;
  },
  company: 'Apple, Inc.'
})

var target  = null;
//Event Handlers                        /*--function on clicking plus icon --*/
Template.faqs_finance.events({
  'click .faqs_module-tile': function(e) {
    var oldHeight = 0;

    if(target == (e.currentTarget))              /*- checks with null value set---*/
    {
      $(".faqs_module-tile").css({'background-color':'#ffffff','border-left-color':'#e1e1e1'});
      $(".faqs_module-subtext").fadeOut(150); /*--fadesout all the opened texts and changes the color to default black--*/
      $(".fa-angle-down").css('display','inline-block');
      $(".faqs_module-faqtext").css('font-family','HN-L');
      $(".faqs_module-faqtext").css('padding-top','20px');
      $(".faqs_module-close").css('display','none');
      $('.faqs_module-layout').delay(150).height('325');
      $('.faqs_module-tile').delay(150).height('55');
      target='';
    }
    else {

      target = (e.currentTarget);
      $(".faqs_module-subtext").fadeOut(150); /*--changes color on second click of different question---*/
      $(".faqs_module-tile").css({'background-color':'#ffffff','border-left-color':'#e1e1e1'});
      $(".fa-angle-down").css('display','inline-block');
      $(".faqs_module-faqtext").css('font-family','HN-L');
      $(".faqs_module-close").css('display','none');
      $('.faqs_module-layout').delay(150).height('325');
      $('.faqs_module-tile').delay(150).height('55');
      $(e.currentTarget).css({'background-color':'#f2f2f2','border-left-color':'#3098ff'});
      $(e.currentTarget).children('.faqs_module-subtext').slideToggle({duration: 250, progress: function(){
          $('.faqs_module-layout').height($('.faqs_module-layout').height() + $(e.currentTarget).children('.faqs_module-subtext').height() - oldHeight);
          $(e.currentTarget).height($(e.currentTarget).height() + $(e.currentTarget).children('.faqs_module-subtext').height() - oldHeight);
          oldHeight = $(e.currentTarget).children('.faqs_module-subtext').height();
        }
      });    /*--when plus icon is clicked expands to show the text below--*/
      $(e.currentTarget).children('.faqs_module-arrow').children(".fa-angle-down").css('display','none');                      /*--when icon is clicked changes the color of text and icon--*/
      $(e.currentTarget).children('.faqs_module-faqtext').css('font-family','HN-B');
      $(e.currentTarget).children('.faqs_module-faqtext').css('padding-top','30px');
      $(e.currentTarget).children('.faqs_module-arrow').children('.faqs_module-close').css('display','inline-block');
      $('.faqs_module-layout').height($('.faqs_module-layout').height() + $(e.currentTarget).children('.faqs_module-subtext').height() + 30);
      $(e.currentTarget).height($(e.currentTarget).height() + $(e.currentTarget).children('.faqs_module-subtext').height() + 30);
    }
  }

});

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
      ques:"What was the largest execution transaction at Facebook, Inc.?",
      ans:"empty Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliquafield asdasd asasdas adassd asdasda sas"
    },
    {
      ques:"Who are the executives at Facebook, Inc.?",
      ans:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      ques:"Who are the board members at Facebook, Inc.?",
      ans:"empty empty"
    },
    {
      ques:"What is Facebook, Inc.'s current stock price?",
      ans:"empty Lorem ipsum dolor sit amet, consectetur adipiscing elit, sedaliquafield asdasd asasdas adassd asdasda sas"
    }
  ]);
});
/* ----Helper function defined--*/
var backgroundStyle = "#f4f4f4";
Template.faqs_finance.helpers ({
  getquestionbox: function() {                 /*-----using this function to run through loop to display container text on html --------*/
    var data = Session.get("faqs_finance_questions");
    return data;
  },
  style: function() {
    if (backgroundStyle === "violet")
    {
      backgroundStyle="white";
      return backgroundStyle;             /*-----using this function to run through loop to display tile with different background style --------*/
    }
    else {
      backgroundStyle = "violet";
      return backgroundStyle;
    }
  }
})

var target  = null;
//Event Handlers                        /*--function on clicking plus icon --*/
Template.faqs_finance.events({
  'click .faqs_module-plusicon': function(e) {
    if(target == (e.target))              /*- checks with null value set---*/
    {
      $(".faqs_module-subtext").fadeOut(300);         /*--fadesout all the opened texts and changes the color to default black--*/
      $(".fa-plus-circle").css('color','black');
      $(".faqs_module-faqtext").css({'color':'black','font-family':'HN-L' });
      target='';
    }
    else {

      target = (e.target);
      $(".faqs_module-subtext").fadeOut(300);           /*--changes color on second click of different question---*/
      $(".fa-plus-circle").css('color','black');
      $(".faqs_module-faqtext").css({'color':'black','font-family':'HN-L' });
      $(e.target).parent().nextAll('.faqs_module-subtext').slideToggle(500);    /*--when plus icon is clicked expands to show the text below--*/
      $(e.target).css('color','#3098ff');                      /*--when icon is clicked changes the color of text and icon--*/
      $(e.target).parent().nextAll('.faqs_module-faqtext').css({'color':'#3098ff','font-family':'HN' });
    }
  }

});

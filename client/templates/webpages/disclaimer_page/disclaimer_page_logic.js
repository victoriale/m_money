/* Author: Ryan Fisher
** Created: 10/09/2015
** Description: .js file for Disclaimer Page
** Associated Files: disclaimer_page.html, disclaimer_page.less, disclaimer_page_logic.js
*/

Template.disclaimer_page.onRendered(function(){
  $('#sort_by').val("Disclaimer");
})

Template.disclaimer_page.events({
  'change #sort_by': function(e){
    var page = e.target.value;
    switch(page){
      case 'About':
        Router.go('content.aboutus');
        break;
      case 'Contact':
        Router.go('content.contactus');
        break;
      case 'Copyright':
        Router.go('content.copyright');
        break;
      case 'Disclaimer':
        Router.go('content.disclaimer');
        break;
      case 'Privacy':
        Router.go('content.privacypolicy');
        break;
      case 'Stock':
        Router.go('content.stockdisclaimer');
        break;
      case 'Terms':
        Router.go('content.termsofservice');
        break;
    }
  }
});

Template.disclaimer_page.helpers({
  BackTxt: "[Profile]"
})

/*
Router.path('content.disclaimer');
Router.path('content.contactus');
Router.path('content.aboutus');
Router.path('content.copyright');
Router.path('content.privacypolicy');
Router.path('content.stockdisclaimer');
Router.path('content.termsofservice');
*/

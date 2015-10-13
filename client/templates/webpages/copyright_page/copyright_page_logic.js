/* Author: Zachary Pearson
** Created: 10/13/2015
** Description: .js file for Copyright Page
** Associated Files: copyright_page.html, copyright_page.less, copyright_page_logic.js
*/

Template.copyright_page.helpers({
  company: function(){
    return "[Profile]";
  }
})

Template.copyright_page.onRendered(function(){
  $('#sort_by').val("Copyright");
})

Template.copyright_page.events({
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

/*
Router.path('content.disclaimer');
Router.path('content.contactus');
Router.path('content.aboutus');
Router.path('content.copyright');
Router.path('content.privacypolicy');
Router.path('content.stockdisclaimer');
Router.path('content.termsofservice');
*/

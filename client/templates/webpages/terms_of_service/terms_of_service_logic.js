/* Author: Ryan Fisher
** Created: 10/09/2015
** Description: .js file for Privacy Terms of Service Page
** Associated Files: terms_of_service.html, terms_of_service.less, terms_of_service_logic.js
*/

Template.terms_of_service.onRendered(function(){
  $('#sort_by').val("Terms");
})

Template.terms_of_service.events({
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

Template.terms_of_service.helpers({
  BackTxt: "[Profile]"
})

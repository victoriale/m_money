/* Author: Ryan Fisher
** Created: 10/09/2015
** Description: .js file for Privacy Policy Page
** Associated Files: privacy_policy_page.html, privacy_policy_page.less, privacy_policy_logic.js
*/

Template.privacy_policy_page.onRendered(function(){
  $('#sort_by').val("Privacy");
})

Template.privacy_policy_page.events({
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

Template.privacy_policy_page.helpers({
  BackTxt: "[Profile]"
})

/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: privacy_policy_page.html, privacy_policy_logic.js, about_us_page.less
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
  Title:"Privacy Policy",
  About:"InvestKit’s Privacy Policy",
  Profile: "[Profile]",
  Country: "The United States",
  Statement: "For InvestKit",
  Update: "06/24/2015,8:00 AM EST",
  back_url:"#",
  profile_ulr:"#",
  image_url:"/tribune_logo.png"
})

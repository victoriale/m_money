/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: terms_of_service.html, terms_of_service_logic.js, about_us_page.less
*/
Template.terms_of_service.helpers({
  Title:"Terms of Service",
  About:"InvestKit’s Terms of Service",
  Profile: "[Profile]",
  Country: "The United States",
  Statement: "For InvestKit",
  Update: "06/24/2015,8:00 AM EST",
  back_url:"#",
  profile_ulr:"#",
  image_url:"/tribune_logo.png"
})

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

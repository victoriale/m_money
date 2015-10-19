/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: stock_disclaimer_page.html, stock_disclaimer_page_logic.js, about_us_page.less
*/

Template.stock_disclaimer_page.helpers({
  Title:"Stock Disclaimer",
  About:"InvestKit’s Stock Disclaimer",
  Profile: "[Profile]",
  Country: "The United States",
  Statement: "For InvestKit",
  Update: "06/24/2015,8:00 AM EST",
  back_url:"#",
  profile_ulr:"#",
  image_url:"/tribune_logo.png"
})

Template.stock_disclaimer_page.onRendered(function(){
  $('#sort_by').val("Stock");
})

Template.stock_disclaimer_page.events({
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

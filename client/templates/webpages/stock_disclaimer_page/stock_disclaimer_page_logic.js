/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: stock_disclaimer_page.html, stock_disclaimer_page_logic.js, about_us_page.less
*/

Template.stock_disclaimer_page.helpers({
  Title:"Stock Disclaimer",
  About:"InvestKit’s Stock Disclaimer",
  Profile: function(){
    if(Session.get('IsCompany')) {
       return Session.get("profile_header").c_name;
    } else if(Session.get('IsExec')){
      data = Session.get('profile_header');
      return data['o_first_name'] + " " + data['o_last_name'];
    } else if(Session.get('IsLocation')){
      return "San Francisco";
    }
  },
  Country: "The United States",
  Statement: "For InvestKit",
  Update: globalDateFormat(1435150800000,'timeZone'),
  // Update: moment.utc(1435150800000).tz('America/New_York').format('MM/DD/YYYY, h:mm A z'),
  back_url: function(){
    if(Session.get('IsCompany')) {
       return "/company/"+ Session.get("profile_header").c_ticker;
    } else if(Session.get('IsExec')){
       return "/executive/"+ Session.get("profile_header").o_id;
    } else if(Session.get('IsLocation')){
      return "/location";
    } else {
      return "/";
    }
  },
  profile_ulr:"#",
  image_url:"/public/tribune_logo.png"
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

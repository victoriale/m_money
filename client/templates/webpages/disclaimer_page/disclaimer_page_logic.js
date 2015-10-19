/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: disclaimer_page.html, disclaimer_page_logic.js, about_us_page.less
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
  Title:"Disclaimer",
  About:"InvestKit's Disclaimer",
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
  Statement: "For Investkit",
  Update: "06/24/2015,8:00 AM EST",
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
  image_url:"/tribune_logo.png"
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

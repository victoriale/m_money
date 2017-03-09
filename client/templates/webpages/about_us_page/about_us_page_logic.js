/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: about_us_page.html, about_us_page_logic.js, about_us_page.less
*/

Template.about_us_page.helpers({
  Title:"About Us",
  About:"InvestKit’s About Us",
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
  currentDate: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var date = (new Date(data.last_updated)).toSNTForm();
    return date;
  },

  aboutInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return '';
    }
    var items = [
     { totals:"Total U.S. Public Companies",
       numbers:data.total_companies,
       image:"/public/Icon_Companies.png"
     }, {
       totals:"Total U.S. Executives",
      numbers:data.total_executives,
        image:"/public/Icon_Executives.png"
     }
   ];
   return items;
  },
  Country: "United States",
  Statement: "Take a Seat and get to know us better.",
  Update: globalDateFormat(1435150800000,'timeZone'),

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
  image_url:"/public/tribune_logo.png"
});

Template.about_us_page.onRendered(function(){
  $('#sort_by').val("About");
})

Template.about_us_page.events({
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

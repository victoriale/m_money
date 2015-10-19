/*
Author: David Wibowo
Created: [10-15-2015]
Description:conatct us webpage
Associated Files: contact_us_page.html, contact_us_page.js, contact_us.less, about_us_page.less
*/
Template.contact_us_page.helpers({
  Title:"Contact Us",
  About:"[Profile]'s [Page Name]",
  Profile: "[Profile]",
  Country: "The United States",
  Statement: "Help us help you faster",
  Update: "06/24/2015,8:00 AM EST",
  back_url:"#",
  profile_ulr:"#",
  image_url:"/tribune_logo.png"
});

Template.contact_us_page.onRendered(function(){
  $('#sort_by').val("Contact");
})

Template.contact_us_page.events({

  'click .cup_submit': function(e) {

    if($(".cup_namefield").val() == "")
    {
      alert("Please Fill in your name.");
      return false;
    }
    if($(".cup_emailfield").val() == "")
    {
      alert("Please enter in an email.");
      return false;
    }
    if($(".cup_txtarea").val() == "")
    {
      alert("Please enter in your message.");
      return false;
    }
    return true;
  },

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

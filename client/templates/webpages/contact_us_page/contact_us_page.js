/*
Author:Prashanth Diddi
Created: [09-06-2015]
Description: conatct us webpage
Associated Files: contact_us_page.less,contact_us_page.html
*/

Template.contact_us_page.onRendered(function(){
  $('#csort_by').val("Contact");
})


Template.contact_us_page.helpers({
  profile: "[Profile]",
  pageName: "[Page Name]",
  dataPoint: "[Data Point]"
  // con_drpp_dwn:[
  //   { listname:"now_reading", listtype:"Now Reading", listno:"NR", option1: "Copyright Infringement", option2: "Disclaimer", option3: "Privacy Policy", option4: "Stock Disclaimer", option4: "Terms of Service"}
  // ]
});

//To hide the dropdown menu when clicked on body of the page
$(document).click( function(){
  $('#NR').slideUp();
  $('.dropdown-meEX').slideUp();
});

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

  'change #csort_by': function(e){
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

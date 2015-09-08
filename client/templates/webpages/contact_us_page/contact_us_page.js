/*
Author:Prashanth Diddi
Created: [09-06-2015]
Description: conatct us webpage
Associated Files: contact_us_page.less,contact_us_page.html
*/


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
  }
});

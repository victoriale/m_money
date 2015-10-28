/*
  Author: Lutz Lai
  Date: 07/13/15
  Description: This js file contains all the logic for the directoy layout
  Associated files: client/layouts/realestate/directory_layout.html
*/

Template.directory_list_button.events({
  //Event to display/hide directory dropdown when directory button clicked
  'click .dropdown-button2': function(e, t){
    t.$('.dropdown-container').stop(true).toggle();
  },
  //Event to hide directory dropdown when directory is chosen
  'click .dir-list-item2': function(e, t){
    t.$('.dropdown-container').stop(true).hide();
  }
})

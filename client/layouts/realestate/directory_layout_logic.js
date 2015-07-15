/*
  Author: Lutz Lai
  Date: 07/13/15
  Description: This js file contains all the logic for the directoy layout
  Associated files: client/layouts/realestate/directory_layout.html
*/

Template.directory_list_button.onRendered(function(){
  var params = Router.current().params;

  //If lists data does not exist, get data
  if(!Session.get('directory_lists')){

    //HTTP call to retrieve the lists of lists
    HTTP.call('GET', 'http://api.synapsys.us/listhuv/?action=list-of-lists', function(err, result){
      if(err){
        //Error code
      }else{
        Session.set('directory_lists', result.data.available_lists);
      }//Close else
    })//Close Meteor Call
  }//Close if
})

Template.directory_list_button.events({
  //Event to display/hide directory dropdown when directory button clicked
  'click .dropdown-button': function(e, t){
    t.$('.dropdown-container').stop(true).toggle();
  },
  //Event to hide directory dropdown when directory is chosen
  'click .dir-list-item': function(e, t){
    t.$('.dropdown-container').stop(true).hide();
  },

  'click .home_redirect': function(){
    Router.go("content.realestate.homepage",{
      partner_id: Session.get("partner_id")
    });
  },
})

Template.directory_list_button.helpers({
  //Helper to display directory list data
  dirList: function(){
    var data = Session.get('directory_lists');

    if(data){
      data.map(function(item, index){
        item.linkVal = item.method.replace(/_/g, '-');
        item.pageNum = 1;
      })

      return data;
    }else{
      return false;
    }
  }
})

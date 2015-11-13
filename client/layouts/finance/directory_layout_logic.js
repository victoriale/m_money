/*
  Author: Lutz Lai
  Date: 07/13/15
  Description: This js file contains all the logic for the directoy layout
  Associated files: client/layouts/realestate/directory_layout.html
*/

Template.directory_list_button.onCreated(function(){
  var data = Session.get('investkit_trending_list');

  if(typeof(data) === 'undefined'){
    Meteor.call('listOfListLoc', '', function(err, result){
      //console.log('list result', result);
      if(err){
        //Error code
      }else{
        //Success code

        result.list_of_lists.map(function(item, index){
          var linkData = item.top_list_info;
          item.url = Router.pick_path('content.toplist', {loc_id: linkData.top_list_location[0], l_name: compUrlName(linkData.top_list_title), list_id: linkData.top_list_id,page_num:1});

          return item;
        })

        Session.set('investkit_trending_list', result.list_of_lists);
      }
    })
  }
})

Template.directory_list_button.helpers({
  site_name: function() {
    var params = Router.current().getParams();
    if ( params.partner_id == null || typeof params.partner_id == 'undefined') {
      return 'MYINVESTKIT';
    }
    return 'INVESTKIT';
  },
  trending_list: function(){
    var data = Session.get('investkit_trending_list');

    if(typeof data === 'undefined'){
      return '';
    }

    return data;
  }
})

Template.directory_list_button.events({
  //Event to display/hide directory dropdown when directory button clicked
  'click .dropdown-button2': function(e, t){
    t.$('.dropdown-container').stop(true).toggle();
  },
  //Event to hide directory dropdown when directory is chosen
  'click .dir-list-item': function(e, t){
    t.$('.dropdown-container').stop(true).hide();
  },
  //Event to display/hide list dropdown
  'click #invest-list': function(e, t){
    t.$('.dir-dropdown-block-list').toggle();
  },
  //Event to close list when options selected
  'click .dir-dropdown-block-list-ul-item': function(e, t){
    t.$('.dir-dropdown-block-list').hide();
  },
  'mouseleave .dir-dropdown-block-list': function(e, t){
    t.$('.dir-dropdown-block-list').hide();
  }
})

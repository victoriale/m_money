/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.list_of_list_loc_page.onRendered(function(){
  Session.set('list_page_num', 2);
  Session.set('isPulling', false);
  function recursive_list() {
    if ( Session.get('list_page_num') > 100 || (Router.current().route.getName() != "content.listoflistloc" && Router.current().route.getName() != "partner.listoflistloc") ) {
      $(window).unbind('scroll');
      return false;
    }
    if ( $(window).scrollTop() + $(window).height() < $('.footer-standard').offset().top - 100 || Session.get('isPulling') ) {
      return false;
    }
    Session.set('isPulling', true);
    Meteor.call('listOfListLoc', Router.current().params.loc_id, Session.get('list_page_num'), function(error, data){
      if(error || data.success == false){
        console.log('Invalid Team Error', error);
        Session.set('list_page_num', Session.get('list_page_num') + 1);
        Session.set('IsError', true);
        return '';
      }
      var old_data = Session.get('list_of_lists');
      $.merge(old_data, data.list_of_lists);
      Session.set('list_of_lists', old_data);
      Session.set('list_page_num', Session.get('list_page_num') + 1);
      Session.set('isPulling', false);
      recursive_list();
    });
  }
  recursive_list();
  $(window).scroll(recursive_list);
});

Template.list_of_list_loc_page.helpers({
  goBack:function(){
    var params = Router.current().getParams();

    if ( Router.current().params.partner_id == Router.current().params.loc_id ) {
      return Router.pick_path('content.partnerhome',{});
    }

    return Router.pick_path('content.locationprofile', {
      loc_id:params.loc_id,
    });
  },

  listsData: function(){
    var list = Session.get('list_of_lists');
    var params = Router.current().getParams();
    if(typeof list =='undefined'){
      return false;
    }
    $.map(list, function(data, index){
      if((index % 2) == 0){
        data['index_color'] = '#f2f2f2';
      }else{
        data['index_color'] = '#ffffff';
      }
      data.locurl = Router.pick_path('content.locationprofile',{
        loc_id:params.loc_id,
      });
      //create URL before shifting array
      $.map(data['top_list_list'], function(data, index){
        data['url'] = Router.pick_path('content.companyprofile',{
          ticker:data.c_ticker,
          name:compUrlName(data.c_name),
          company_id: data.c_id
        });
      })

      //get list of list URL to top-list Page
      var id_param = data.top_list_info.top_list_id;
      var loc_param = data.top_list_info.top_list_location[0];
      var list_name = data.top_list_info.top_list_title;
      data['list_url'] = Router.pick_path('content.toplist',{
        loc_id:loc_param,
        l_name:compUrlName(list_name),
        list_id:id_param,
        page_num:1
      });
      //move first listed item to a seperate object to go into big circle
      data['top'] = data.top_list_list[0];
      data['top_list_list'].shift();
    })
    return list;
  },

  checkList: function(){
    var list = Session.get('list_of_lists');
    if(typeof list =='undefined' || list == ''){
      return false;
    }
    return true;
  },

  headerInfo: function(){
    var params = Router.current().getParams();
    if(params.loc_id == "National"){
      return "United States";
    }else if ( typeof Session.get('profile_header') != "undefined" ){
      return Session.get('profile_header').location;
    } else {
      return fullstate(params.loc_id);
    }
  },
});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_of_list_loc_page.events({

});

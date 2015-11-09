/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.list_of_lists_loc.onCreated(function () {

});

Template.list_of_lists_loc.helpers({
  goBack:function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.locationprofile', {
      loc_id:params.loc_id,
    });
  },
  listsData: function(){
    var list = Session.get('list_of_lists');
    if(typeof list =='undefined'){
      return false;
    }
    $.map(list, function(data, index){
      if((index % 2) == 0){
        data['index_color'] = '#f2f2f2';
      }else{
        data['index_color'] = '#ffffff';
      }
      //create URL before shifting array
      $.map(data['top_list_list'], function(data, index){
        data['url'] = Router.pick_path('content.companyprofile',{
          company_id: data.c_id
        });
      })

      //get list of list URL to top-list Page
      var id_param = data.top_list_params.length;
      var loc_param = data.top_list_params[0];
      var list_param = data.top_list_params[id_param-1];
      data['list_url'] = Router.pick_path('content.toplist',{
        loc_id:loc_param,
        list_id:list_param,
        page_num:1
      });
      data['locurl'] = Router.pick_path('content.locationprofile',{
        loc_id:data.c_hq_state,
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
    var data = Session.get('profile_header');
    var params = Router.current().getParams();
    if(typeof data == 'undefined'){
      return false;
    }
    if(params.loc_id == 'National' || typeof params.loc_id == 'undefined' || params.loc_id == ''){
      return 'United States';
    }else{
      return data.location;
    }
  },
});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_of_lists_loc.events({

});

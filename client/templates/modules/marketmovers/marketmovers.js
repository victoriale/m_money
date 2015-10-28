/*
Name: Venkatesh
Created:7/21/2015
Description: Top lists Facebook
Associated Files: list_of_lists.html, list_of_lists_logic.js and list_of_lists.less
*/
//This variable is set as white as our first background is grey, the program checks whether its white and changes it to grey.

Template.marketmovers.helpers({

  listsData: function(){
    var list = Session.get('market_movers');
    if(typeof list =='undefined'){
      return false;
    }
    $.map(list, function(data, index){
      if((index % 2) == 0){
        data.data['index_color'] = '#f2f2f2';
      }else{
        data.data['index_color'] = '#ffffff';
      }
      //create URL before shifting array
      $.map(data.data['top_list_list'], function(data, index){
        data['url'] = Router.path('content.companyprofile',{
          ticker: data.c_ticker,
          name:compUrlName(data.c_name),
          company_id: data.c_id
        });

        return data;
      })

      //get list of list URL to top-list Page
      var id_param = data.data.top_list_params.length;
      var loc_param = data.data.top_list_params[0];
      var list_param = data.data.top_list_info.top_list_id;
      var list_name = compUrlName(data.data.top_list_info.top_list_title);
      data.data['list_url'] = Router.path('content.toplist',{
        loc_id:loc_param,
        lname:list_name,
        list_id:list_param
      });
      console.log(data.data);
      data.shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + data.data['list_url'];
      //move first listed item to a seperate object to go into big circle
      data.data['top'] = data.data.top_list_list[0];
      data.data['top_list_list'].shift();

      return data;
    })
    return list;
  },

  checkList: function(){
    var list = Session.get('market_movers');
    if(typeof list =='undefined' || list == ''){
      return false;
    }
    return true;
  },

  headerInfo: function(){
    var data = Session.get('profile_header');
    if(typeof data == 'undefined'){
      return false;
    }

    return data.location;
  },
});
//This handles the events on button clicks of 1,2,3 and 200
Template.marketmovers.events({

});

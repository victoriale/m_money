Template.marketmovers.onRendered(function(){


});

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
        data['url'] = Router.pick_path('content.companyprofile',{
          ticker: data.c_ticker,
          name:compUrlName(data.c_name),
          company_id: data.c_id
        });
        return data;
      })

      //get list of list URL to top-list Page
      var id_param = data.data.top_list_params.length;
      var loc_param = data.data.top_list_info.top_list_location[0];
      var list_param = data.data.top_list_info.top_list_id;
      var list_name = compUrlName(data.data.top_list_info.top_list_title);
      data.data['list_url'] = Router.pick_path('content.toplist',{
        loc_id:loc_param,
        l_name:list_name,
        list_id:list_param
      });
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
    var params = Router.current().getParams();
    if(typeof data == 'undefined'){
      return false;
    }
    data.loc_url = Router.pick_path('content.locationprofile',{
      loc_id:params.loc_id,
    })
    if ( typeof params.loc_id == "undefined" ) {
      data.fullstate = Session.get('profile_header').location;
    } else {
      data.fullstate = fullstate(params.loc_id);
    }
    return data;
  },

  //Helper to build url for list of list page
  toListOfList: function(){
    var data = Session.get('list_of_lists');
    var params = Router.current().getParams();
    return Router.pick_path('content.listoflistloc', {
      loc_id:params.loc_id
    });
  },

});

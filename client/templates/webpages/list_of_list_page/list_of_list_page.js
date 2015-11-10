
Template.list_of_list_page.helpers({
  goBack:function(){
    var params = Router.current().getParams();

    return Router.pick_path('content.companyprofile', {
      name:params.name,
      ticker:params.ticker,
      company_id:params.company_id
    });
  },
  //Helper to determine list of list title
  title: function(){
    var data = Session.get('list_of_lists');

    if(typeof data === 'undefined'){
      return '';
    }

    return data.list_rankings[0].c_name;
  },
  listsData: function(){
    var list = Session.get('list_of_lists');
    if(typeof list =='undefined'){
      return false;
    }

    $.map(list.list_rankings, function(data, index){
      if((index % 2) == 0){
        data['index_color'] = '#f2f2f2';
      }else{
        data['index_color'] = '#ffffff';
      }
      data.top_list_list[0].locurl = Router.pick_path('content.locationprofile',{
        loc_id:'National',
      });
      //Define array to map through
      var subData = data.top_list_list[0].list_of_lists_data;
      var params = Router.current().getParams();

      data.compURL =  Router.pick_path('content.companyprofile', {
        ticker:params.ticker,
        name:params.name,
        company_id: data.c_id
      });
      //Build url for sub circle images
      subData.map(function(item, index){
        console.log(item);
        item.imageURL = Router.pick_path('content.companyprofile', {
          ticker:item.c_ticker,
          name:compUrlName(item.c_name),
          company_id: item.c_id
        });
        return item;
      })
      var title = compUrlName(data.top_list_list[0].list_of_lists_title);
      data.url = Router.pick_path('content.toplist', {
        l_name:title,
        list_id: data.tli_id,
        page_num:1
      });

      data.shareURL = "https://www.facebook.com/sharer/sharer.php?u="+ data.url;
    })
    return list.list_rankings;
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
    if(typeof data == 'undefined'){
      return false;
    }
    if(Session.get('IsCompany')){
      var name = data.c_name;
    }
    if(Session.get('IsExec')){
      var name = data.c_name;
    }
    return name;
  },
});

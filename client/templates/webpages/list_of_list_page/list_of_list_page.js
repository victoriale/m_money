
Template.list_of_list_page.helpers({
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

      //Define array to map through
      var subData = data.top_list_list[0].list_of_lists_data;

      //Build url for sub circle images
      subData.map(function(item, index){
        item.imageURL = Router.path('content.companyprofile', {company_id: item.c_id});

        return item;
      })
      data.url = Router.path('content.toplist', {list_id: data.tli_id});

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

/*
Author: Meghana yerramilli
Created: [07-20-2015]
Description: featured top 100 lists
Associated Files: featured_list.html, featured_list.less
*/
//render function to set the array with data

Template.featured_list.onCreated(function(){

})

Template.featured_list.onRendered( function() {
  Session.set("fl_counter",0);
});

Template.featured_list.events({
  'click .fl_block_leftbutton': function(){
    var counter = Session.get("fl_counter");
    if(Session.get('IsLocation')){
      var list = Session.get('featured_lists')[0]['top_list_list'];
    }else{
      var list = Session.get('featured_lists')['featured_list_data'];
    }
    if(counter > 0){
      counter--;
      Session.set("fl_counter",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("fl_counter", counter);
    }
  },
  'click .fl_block_rightbutton': function(){
    var counter = Session.get("fl_counter");
    if(Session.get('IsLocation')){
      var list = Session.get('featured_lists')[0]['top_list_list'];
    }else{
      var list = Session.get('featured_lists')['featured_list_data'];
    }
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("fl_counter",counter);
    }
    else
    {
      counter = 0;
      Session.set("fl_counter", counter);
    }
  },
})
//helper function to retrieve data from array
Template.featured_list.helpers (
  {
    checkData:function(){
      var data = Session.get('featured_lists');
      if(typeof data == 'undefined'){
        return '';
      }
      if(Session.get('IsExec')){
        return false;
      }
      return true;
    },
    featuredData: function(){
      var data = Session.get('featured_lists');
      if(typeof data == 'undefined'){
        return '';
      }
      if(Session.get('IsLocation')){
        data.featured_list_data = data[0].top_list_list;
        data.featured_list_title = data[0].top_list_info.top_list_title;
        var newData = data.featured_list_data;
      }else{
        var newData = data.featured_list_data;
      }
      return data;
    },

    featuredList: function(){
      var data = Session.get('featured_lists');
      var count = Session.get('fl_counter');
      if(typeof data == 'undefined'){
        return '';
      }
      if(Session.get('IsLocation')){
        data.featured_list_data = data[0].top_list_list;
        data.featured_list_title = data[0].top_list_info.top_list_title;
        var newData = data.featured_list_data;
      }else{
        var newData = data.featured_list_data;
      }
      //console.log(data);
      //console.log(newData);

      $.map(newData, function(data ,index){
        data['comp_url'] = Router.pick_path('content.companyprofile',{
          ticker:data.c_ticker,
          name:compUrlName(data.c_name),
          company_id: data.c_id
        })
        data['loc_url'] = Router.pick_path('content.locationprofile',{
          loc_id:data.c_hq_state,
          city:compUrlName(data.c_hq_city)
        })
        for(objName in data){
          if(objName === 'stock_percent'){
            data['data_name'] = "Stock Percent";
            data['data_value'] = Number(data['stock_percent']).toFixed(2)+"%";
          }
          if(objName === 'market_cap'){
            data['data_name'] = "Market Cap";
            data['data_value'] = '$'+nFormatter2(data['market_cap']);
          }
          if(objName === 'market_percent'){
            data['data_name'] = "Market Percent";
            data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
          }
          if(objName === 'trading_volume'){
            data['data_name'] = "Trading Volume";
            data['data_value'] = dNumberToCommaNumber(Number(data.trading_volume).toFixed(0));
          }
          if(objName === 'pe_ratio'){
            data['data_name'] = "PE Ratio";
            data['data_value'] = Number(data['pe_ratio']).toFixed(0);
          }
          if(objName === 'eps'){
            data['data_name'] = "Earnings Per Share";
            data['data_value'] = Number(data['eps']).toFixed(2);
          }
        }
      })
      return newData[count];
    },

    compName: function(){
      var data = Session.get('profile_header');
      if(typeof data == 'undefined'){
        return '';
      }
      if(Session.get('IsLocation')){
        var comp = data['location'];
      }else{
        var comp = data.c_name;
      }

      return comp;
    },

    counter: function(){
      var count = Session.get('fl_counter');
      return count+1;
    },

    company_stock: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_stock : '';
    },
    company_shares: function() {
      var data = Session.get("fl_data");
      return typeof(data) !== 'undefined' ? data[0].company_shares : '';
    },
    gettitle: function() {
      var header = Session.get('profile_header');
      var data = Session.get('list_of_lists');
      var params = Router.current().getParams();
      if(typeof header == 'undefined'){
        return false;
      }

      if(Session.get('IsCompany')){

      }
      //Helper to build url for list of list page
        if(Session.get('IsCompany')){
          var title = header.c_ticker;
          var url = Router.pick_path('content.listoflist', {
            ticker:params.ticker,
            name:params.name,
            company_id: data.list_rankings[0].c_id
          });
          var url2 = Router.pick_path('content.listoflistloc', {
            loc_id:header.c_hq_state
          });
        }
        if(Session.get('IsExec')){
          var title = header.c_ticker;
          var url = Router.pick_path('content.listoflist', {
            loc_id:header.c_hq_state
          });
          var url2 = Router.pick_path('content.listoflistloc', {
            loc_id:header.c_hq_state
          });
        }
        if(Session.get('IsLocation')){
          var title = Session.get('profile_header').location;
          var url = Router.pick_path('content.listoflistloc', {
            loc_id:params.loc_id
          });
          var url2 = Router.pick_path('content.listoflistloc', {
            loc_id:params.loc_id
          });
        }
      var data = [
        {
          title: title + " Trending Lists",
          fl_none:'none',
          tile2_icon_none:'none',
          tile3_icon_none:'none',
          url:url
        },
        {
          title:"Top Featured Lists",
          fl_none:'none',
          tile1_icon_none:'none',
          tile3_icon_none:'none',
          url:url2
        },
        {
          title:"All Finance Top 100 Lists",
          tile1_icon_none:'none',
          tile2_icon_none:'none',
          url:url2
        },
      ]
      return data;
    },
    profile: function(){
      var data = "[PROFILE]";
      return data;
    },
    featURL: function(){
      var data = Session.get('featured_lists');
      var count = Session.get('fl_counter');

      if(typeof data === 'undefined'){
        return '';
      }
      if(Session.get('IsLocation')){
        var linkData = data[count].top_list_info;
      return Router.pick_path('content.toplist', {
        loc_id: linkData.top_list_location[0],
        l_name: compUrlName(linkData.top_list_title),
        list_id: linkData.top_list_id,
        page_num:1
      });
      }else{
        return Router.pick_path('content.toplist', {
          l_name: compUrlName(data.featured_list_title),
          list_id: data.featured_list_id,
          page_num:1
        });
      }
    },
  });

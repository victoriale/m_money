/*
Author: jyothyswaroop
Created: 07/30/2015
Description: followers page
Associated Files: list_view.less and list_view.html
*/

Template.list_view.onCreated(function(){
  Session.set('lv_count', 0);
})

//renders the data when page loads
Template.list_view.onRendered(function () {
  $(".list_vw-page-selector1").css("background-color","#3098ff");
});

var backgroundStyle="tilewhite";
Template.list_view.helpers({
  location_info: function() {
    var data = Session.get('top_list_gen');
    if ( typeof data == "undefined" ) {
      return '';
    }

    if ( data.top_list_info.top_list_location == '' ) {
      return {
        url: Router.pick_path('content.locationprofile',{
          loc_id: 'National',
        }),
        name: 'United States'
      };
    }

    if ( !isNaN(parseInt(data.top_list_info.top_list_location[0])) ) {
      return '';
    }

    if ( typeof fullstate(data.top_list_info.top_list_location[0]) != "undefined" ) {
      data.top_list_info.top_list_location[0] = fullstate(data.top_list_info.top_list_location[0]);
    }

    return {
      url: Router.pick_path('content.locationprofile',{
        loc_id: data.top_list_info.top_list_location[0]
      }),
      name: data.top_list_info.top_list_location[0]
    };
  },
  back_url: function(){
    var url = Router.current().getParams();
    if(url.loc_id === '' || typeof url.loc_id == 'undefined' || url.loc_id == null){
      return Router.pick_path('content.locationprofile',{
        loc_id: 'National',
      });
    }
    return Router.pick_path('content.locationprofile',{
      loc_id: url.loc_id,
    });
  },

  backProfile: function(){
    var url = Router.current().getParams();
    if(url.loc_id === '' || typeof url.loc_id == 'undefined' || url.loc_id == null){
      return 'National'
    }
    return fullstate(url.loc_id);
  },
  image: function(){
    var params = Router.current().getParams();
    var datalist = Session.get('top_list_gen').top_list_info;
    if(params.list_id != 'sv150_gainers' && params.list_id != 'sv150_losers'){
      var data = datalist.top_list_location[0];
    }
    if(data == 'National' || data == '' || typeof data == 'undefined' || params.list_id == 'sv150_gainers' || params.list_id == 'sv150_losers'){

      return "background-image: url('/StateImages/Location_National.jpg');";
    }else{
      if(isNaN(data)){
        data = fullstate(data);
        data = data.replace(/ /g, '_');
        return "background-image: url('/StateImages/Location_"+ data +".jpg');";
      }else{
        return "background-image: url('/DMA_images/location-"+ data +".jpg');";
      }
    }
  },

  toplist:function(){
    var params = Router.current().getParams();
    if(params.list_id == 'sv150_gainers' || params.list_id == 'sv150_losers'){
      var listdata = Session.get('sv150_list');
      listdata['top_list_list'] = listdata['sv150_list_data'];
      listdata['top_list_info'] = {};
      if(params.list_id == 'sv150_gainers'){
        listdata['top_list_info']['top_list_title'] = "Top SV150 List Gainers";
      }else{
        listdata['top_list_info']['top_list_title'] = "Top SV150 List Losers";
      }
    }else{
      var listdata = Session.get('top_list_gen');
    }
    if(typeof listdata =='undefined'){
      return '';
    }
    $.map(listdata.top_list_list, function(data,index){
      if(index % 2 == 0){
        data['background'] = 'tilewhite';
      }else{
        data['background'] = 'tilegrey';
      }
      if (params.list_id == 'sv150_gainers' || params.list_id == 'sv150_losers'){
        data.lcsi_price_last_operator = data.csi_price_last_operator;
      }

      if(typeof data.c_hq_state =='undefined'){
        data.c_hq_state = 'United';
        data.c_hq_city = 'States';
        data['locUrl'] = Router.pick_path('content.locationprofile',{
          loc_id:'National',
        });
      }else{
        data['locUrl'] = Router.pick_path('content.locationprofile',{
          loc_id:data.c_hq_state,
        });
      }


      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });
      data['exchurl'] = globalUrl(data.c_exchange);
      if(params.list_id == 'sv150_gainers' || params.list_id == 'sv150_losers'){
        data['newDate'] = moment(data.csi_price_last_updated).format('dddd MMM DD, YYYY');
        data.price = commaSeparateNumber_decimal(Number(data.csi_price).toFixed(2));
        data.price_change = commaSeparateNumber_decimal(Number(data.csi_price_change_since_last).toFixed(2));
        data.percent_change = commaSeparateNumber_decimal(Number(data.csi_percent_change_since_last).toFixed(2));
      }else{
        data['newDate'] = moment(data.lcsi_price_last_updated).format('dddd MMM DD, YYYY');
        data.price = commaSeparateNumber_decimal(Number(data.lcsi_price).toFixed(2));
        data.price_change = commaSeparateNumber_decimal(Number(data.lcsi_price_change_since_last).toFixed(2));
        data.percent_change = commaSeparateNumber_decimal(Number(data.lcsi_percent_change_since_last).toFixed(2));
      }
      //data from list can come in 6 different ways these values will catch and give results back
      for(objName in data){
        if(objName === 'stock_percent'){
          data['data_name'] = "Stock Percent";
          data['data_value'] = Number(data['stock_percent']).toFixed(2)+"%";
        }
        if(objName === 'market_cap'){
          data['data_name'] = "Market Cap";
          data['data_value'] = '$'+nFormatter(data['market_cap']);
        }
        if(objName === 'market_percent'){
          data['data_name'] = '$'+commaSeparateNumber_decimal(Number(data['lcsi_market_cap']).toFixed(0));
          data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
        }
        if(objName === 'trading_volume'){
          data['data_name'] = "Trading Volume";
          data['data_value'] = commaSeparateNumber_decimal(data['trading_volume'].split('.')[0]);
        }
        if(objName === 'pe_ratio'){
          data['data_name'] = "PE Ratio";
          data['data_value'] = Number(data['pe_ratio']).toFixed(0);
        }
        if(objName === 'eps'){
          data['data_name'] = "Earnings Per Share";
          data['data_value'] = Number(data['eps']).toFixed(2);
        }
      }//END OF FOR LOOP
    })//END OF MAP function

    return listdata;
  },

  carouselList:function(){
    var count = Session.get("lv_count");
    var params = Router.current().getParams();
    if(params.list_id == 'sv150_gainers' || params.list_id == 'sv150_losers'){
      var listdata = Session.get('sv150_list');
      listdata['top_list_list'] = listdata['sv150_list_data'];
      listdata['top_list_info'] = {};
      if(params.list_id == 'sv150_gainers'){
        listdata['top_list_info']['top_list_title'] = "Top SV150 List Gainers";
      }else{
        listdata['top_list_info']['top_list_title'] = "Top SV150 List Losers";
      }
    }else{
      var listdata = Session.get('top_list_gen');
    }
    if(typeof listdata =='undefined'){
      return '';
    }
    Session.set('top_list_gen', listdata);
    $.map(listdata.top_list_list, function(data,index){
      //data['newDate'] = (new Date(moment(data.csi_price_last_updated))).toSNTForm(); // non standard input for new Date() -- breaks in Safari
      data['newDate'] = moment(data.csi_price_last_updated).format('dddd MMM DD, YYYY');
      data['rank'] = index+1;
      data['url'] = Router.pick_path('content.companyprofile',{
        ticker: data.c_ticker,
        name: compUrlName(data.c_name),
        company_id: data.c_id
      });
      data['exchurl'] = globalUrl(data.c_exchange);
      //data from list can come in 6 different ways these values will catch and give results back
      for(objName in data){
        if(objName === 'stock_percent'){
          data['data_name'] = "Stock Percent";
          data['data_value'] = Number(data['stock_percent']).toFixed(2)+"%";
        }
        if(objName === 'market_cap'){
          data['data_name'] = "Market Cap";
          data['data_value'] = '$'+nFormatter(data['market_cap']);
        }
        if(objName === 'market_percent'){
          data['data_name'] = "Market Percent";
          data['data_value'] = Number(data['market_percent']).toFixed(2)+"%";
        }
        if(objName === 'trading_volume'){
          data['data_name'] = "trading volume";
          data['data_value'] = commaSeparateNumber_decimal(data['trading_volume'].split('.')[0]);
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
    return listdata.top_list_list[count];
  },

  //This function is called everytime "each" loop runs, it returns the respective class which is suppose to use on each iteration
  getBackgroundStyle: function() {

    if (backgroundStyle === "tilegrey")
    {
      backgroundStyle="tilewhite";
      return backgroundStyle;
    } else {
      backgroundStyle = "tilegrey";
      return backgroundStyle;
    }
  }

});
//This handles the events on button clicks of 1,2,3 and 200
Template.list_view.events({
  //Event to close tooltip
  'click .list_vw-x': function(e, t){
    //Currently disabled: Styling needs to be fixed to handle this event
    t.$('.list_vw-ct1').hide();
  },
  'click .list_vw-lefthov': function(){
    var counter = Session.get("lv_count");
    var list = Session.get('top_list_gen')['top_list_list'];
    if(counter > 0){
      counter--;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = list.length-1;
      Session.set("lv_count", counter);
    }
  },
  'click .list_vw-righthov': function(){
    var counter = Session.get("lv_count");
    var list = Session.get('top_list_gen')['top_list_list'];
    if(counter < list.length - 1)
    {
      counter++;
      Session.set("lv_count",counter);
    }
    else
    {
      counter = 0;
      Session.set("lv_count", counter);
    }
  },
});
